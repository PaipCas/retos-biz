import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DashboardContext } from './DashboardContext';

// Rangos de urgencia según el nivel (1 = más urgente). Sirven para el color del badge y el filtro
const RANGES = [
	{ label: 'Crítica', maxLevel: 2, color: 'red' },
	{ label: 'Alta', maxLevel: 4, color: 'orange' },
	{ label: 'Media', maxLevel: 7, color: 'amber' },
	{ label: 'Baja', maxLevel: Infinity, color: 'green' },
];

const getRange = nivel => RANGES.find(range => nivel <= range.maxLevel);

const PrioritiesContext = createContext();

function PrioritiesProvider({ children }) {
	const { markAsUpdated } = useContext(DashboardContext);
	const [prioridades, setPrioridades] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [range, setRange] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

	useEffect(() => {
		axios.get('http://localhost:3001/api/prioridades')
			.then(response => setPrioridades(response.data))
			.catch(error => {
				console.error(error);
				toast.error('No se pudieron cargar las prioridades');
			})
			.finally(() => setLoading(false));
	}, []);

	// Ordenadas de la más urgente a la menos urgente, cada una con su rango
	const sortedPrioridades = [...prioridades]
		.sort((a, b) => a.nivel - b.nivel)
		.map(prioridad => ({ ...prioridad, rango: getRange(prioridad.nivel) }));

	const filteredPrioridades = sortedPrioridades.filter(prioridad =>
		prioridad.nombre.toLowerCase().includes(search.trim().toLowerCase()) &&
		(!range || prioridad.rango.label === range)
	);

	const hasFilters = search.trim() !== '' || range !== '';

	// Siguiente nivel libre, para sugerirlo en el formulario
	const nextLevel = prioridades.length > 0 ? Math.max(...prioridades.map(prioridad => prioridad.nivel)) + 1 : 1;

	// Validaciones de unicidad antes de enviar (en la base de datos nombre y nivel son UNIQUE)
	const isNameTaken = name => prioridades.some(prioridad => prioridad.nombre.toLowerCase() === name.trim().toLowerCase());
	const isLevelTaken = level => prioridades.some(prioridad => prioridad.nivel === level);

	const openCreateModal = () => setShowCreateModal(true);

	// Cierra la modal y limpia el formulario para la próxima vez que se abra
	const closeCreateModal = useCallback(() => {
		setShowCreateModal(false);
		reset();
	}, [reset]);

	const createPrioridad = async data => {
		try {
			const response = await axios.post('http://localhost:3001/api/prioridades', {
				nombre: data.nombre.trim(),
				nivel: data.nivel,
				dias_max_respuesta: data.dias_max_respuesta,
			});
			setPrioridades(prev => [...prev, response.data]);
			markAsUpdated();
			toast.success('Prioridad creada', { description: response.data.nombre });
			closeCreateModal();
		} catch (error) {
			console.error(error);
			// Respaldo por si otro usuario creó el mismo nombre o nivel mientras la modal estaba abierta
			const message = error.response?.data?.error ?? '';
			const description = message.includes('uq_prioridades_nivel') ? 'Ya existe una prioridad con ese nivel'
				: message.includes('uq_prioridades_nombre') ? 'Ya existe una prioridad con ese nombre'
				: 'Intenta de nuevo más tarde';
			toast.error('No se pudo crear la prioridad', { description });
		}
	};

	const onCreate = handleSubmit(createPrioridad);

	const deletePrioridad = async prioridad => {
		try {
			await axios.delete(`http://localhost:3001/api/prioridades/${prioridad.id}`);
			setPrioridades(prev => prev.filter(item => item.id !== prioridad.id));
			markAsUpdated();
			toast.success('Prioridad eliminada', { description: prioridad.nombre });
		} catch (error) {
			console.error(error);
			toast.error('No se pudo eliminar la prioridad', { description: 'Verifica que no tenga retos asociados' });
		}
	};

	const onEdit = prioridad => {
		// TODO: abrir el formulario de edición con los datos de la prioridad
		console.log('Editar', prioridad);
	};

	const onDelete = prioridad => {
		toast.warning(`¿Eliminar la prioridad "${prioridad.nombre}"?`, {
			description: 'Esta acción no se puede deshacer',
			action: { label: 'Eliminar', onClick: () => deletePrioridad(prioridad) },
			cancel: { label: 'Cancelar', onClick: () => {} },
		});
	};

	return <PrioritiesContext.Provider value={{ filteredPrioridades, loading, search, setSearch, range, setRange, ranges: RANGES, hasFilters, onEdit, onDelete, showCreateModal, openCreateModal, closeCreateModal, register, errors, isSubmitting, onCreate, nextLevel, isNameTaken, isLevelTaken }}>
		{children}
	</PrioritiesContext.Provider>;
};

export { PrioritiesContext, PrioritiesProvider };
