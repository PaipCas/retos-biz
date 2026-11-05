import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ChallengesContext = createContext();

const API_URL = 'http://localhost:3001/api';

// Estados tal como están guardados en la base de datos
const ESTADOS = ['Pendiente', 'En progreso', 'Completado', 'Cancelado'];

// Convierte una lista [{ id, nombre }] en un objeto { id: nombre } para buscar nombres rápido
const toNamesMap = list => Object.fromEntries(list.map(item => [item.id, item.nombre]));

function ChallengesProvider({ children }) {
	const [challenges, setChallenges] = useState([]);
	const [prioridades, setPrioridades] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [estado, setEstado] = useState('');
	const [prioridad, setPrioridad] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm({ defaultValues: { estado: 'Pendiente' } });

	const fetchChallenges = useCallback(async () => {
		try {
			const response = await axios.get(`${API_URL}/retos`);
			setChallenges(response.data);
		} catch (error) {
			console.error(error);
			toast.error('No se pudieron cargar los retos');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
	axios.get(`${API_URL}/retos`)
		.then(response => setChallenges(response.data))
		.catch(error => {
			console.error(error);
			toast.error('No se pudieron cargar los retos');
		})
		.finally(() => setLoading(false));

	// Listas para los selects del formulario y del filtro
	axios.get(`${API_URL}/prioridades`).then(response => setPrioridades(response.data)).catch(error => { console.error(error); toast.error('No se pudieron cargar las prioridades'); });
	axios.get(`${API_URL}/categorias`).then(response => setCategorias(response.data)).catch(error => { console.error(error); toast.error('No se pudieron cargar las categorías'); });
	axios.get(`${API_URL}/empresas`).then(response => setEmpresas(response.data)).catch(error => { console.error(error); toast.error('No se pudieron cargar las empresas'); });
}, []);

	// Cambia el id de la prioridad por su nombre para mostrarlo en la tabla
	const prioridadesById = toNamesMap(prioridades);
	const challengesWithNames = challenges.map(challenge => ({ ...challenge, prioridad: prioridadesById[challenge.id_prioridad] ?? challenge.id_prioridad }));

	const filteredChallenges = challengesWithNames.filter(challenge =>
		(challenge.nombre ?? '').toLowerCase().includes(search.trim().toLowerCase()) &&
		(!estado || challenge.estado === estado) &&
		(!prioridad || challenge.id_prioridad === prioridad)
	);

	const hasFilters = search.trim() !== '' || estado !== '' || prioridad !== '';

	const openCreateModal = () => setShowCreateModal(true);

	// Cierra la modal y limpia el formulario para la próxima vez que se abra
	const closeCreateModal = useCallback(() => {
		setShowCreateModal(false);
		reset();
	}, [reset]);

	// Valida que la fecha fin no sea anterior a la fecha de inicio
	const validateEndDate = value => !value || !getValues('fecha_inicio') || value >= getValues('fecha_inicio') || 'La fecha fin no puede ser anterior al inicio';

	const createChallenge = async data => {
		try {
			await axios.post(`${API_URL}/retos`, {
				nombre: data.nombre.trim(),
				descripcion: data.descripcion.trim() || null,
				fecha_inicio: data.fecha_inicio,
				fecha_fin: data.fecha_fin || null,
				estado: data.estado,
				id_empresa: data.id_empresa,
				id_categoria: data.id_categoria,
				id_prioridad: data.id_prioridad,
			});
			// Se vuelve a pedir la lista para traer el reto con el id que genera el backend
			await fetchChallenges();
			toast.success('Reto creado', { description: data.nombre.trim() });
			closeCreateModal();
		} catch (error) {
			console.error(error);
			toast.error('No se pudo crear el reto', { description: 'Intenta de nuevo más tarde' });
		}
	};

	const onCreate = handleSubmit(createChallenge);

	const deleteChallenge = async challenge => {
		try {
			await axios.delete(`${API_URL}/retos/${challenge.id}`);
			setChallenges(prev => prev.filter(item => item.id !== challenge.id));
			toast.success('Reto eliminado', { description: challenge.nombre });
		} catch (error) {
			console.error(error);
			toast.error('No se pudo eliminar el reto', { description: 'Verifica que no tenga registros asociados' });
		}
	};

	const onEdit = challenge => {
		// TODO: abrir el formulario de edición con los datos del reto
		console.log('Editar', challenge);
	};

	const onDelete = challenge => {
		toast.warning(`¿Eliminar el reto "${challenge.nombre}"?`, {
			description: 'Esta acción no se puede deshacer',
			action: { label: 'Eliminar', onClick: () => deleteChallenge(challenge) },
			cancel: { label: 'Cancelar', onClick: () => {} },
		});
	};

	return <ChallengesContext.Provider value={{ filteredChallenges, loading, search, setSearch, estado, setEstado, estados: ESTADOS, prioridad, setPrioridad, prioridades, categorias, empresas, hasFilters, onEdit, onDelete, showCreateModal, openCreateModal, closeCreateModal, register, errors, isSubmitting, onCreate, validateEndDate }}>
		{children}
	</ChallengesContext.Provider>;
};

export { ChallengesContext, ChallengesProvider };