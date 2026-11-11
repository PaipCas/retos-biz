import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DashboardContext } from './DashboardContext';

const ChallengesContext = createContext();

const API_URL = 'http://localhost:3001/api';

// Estados tal como están guardados en la base de datos
const ESTADOS = ['Pendiente', 'En progreso', 'Completado', 'Cancelado'];

// Valores del formulario vacío (se usa al crear y al cerrar la modal)
const EMPTY_FORM = {
	nombre: '',
	descripcion: '',
	fecha_inicio: '',
	fecha_fin: '',
	estado: 'Pendiente',
	id_empresa: '',
	id_categoria: '',
	id_prioridad: '',
};

// Convierte una lista [{ id, nombre }] en un objeto { id: nombre } para buscar nombres rápido
const toNamesMap = list => Object.fromEntries(list.map(item => [item.id, item.nombre]));

// El input type="date" necesita el formato aaaa-mm-dd
const toDateInput = value => value ? String(value).slice(0, 10) : '';

function ChallengesProvider({ children }) {
	const { markAsUpdated } = useContext(DashboardContext);
	const [challenges, setChallenges] = useState([]);
	const [prioridades, setPrioridades] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [estado, setEstado] = useState('');
	const [prioridad, setPrioridad] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	// Reto que se está editando (null cuando se está creando uno nuevo)
	const [editingChallenge, setEditingChallenge] = useState(null);
	const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm({ defaultValues: EMPTY_FORM });

	// Vuelve a pedir la lista de retos (se usa después de crear o editar)
	const fetchChallenges = useCallback(async () => {
		try {
			const response = await axios.get(`${API_URL}/retos`);
			setChallenges(response.data);
		} catch (error) {
			console.error(error);
			toast.error('No se pudieron cargar los retos');
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

	// Abre la modal con el formulario vacío para crear un reto
	const openCreateModal = () => {
		setEditingChallenge(null);
		reset(EMPTY_FORM);
		setShowCreateModal(true);
	};

	// Cierra la modal y limpia el formulario para la próxima vez que se abra
	const closeCreateModal = useCallback(() => {
		setShowCreateModal(false);
		setEditingChallenge(null);
		reset(EMPTY_FORM);
	}, [reset]);

	// Valida que la fecha fin no sea anterior a la fecha de inicio
	const validateEndDate = value => !value || !getValues('fecha_inicio') || value >= getValues('fecha_inicio') || 'La fecha fin no puede ser anterior al inicio';

	// Datos que se envían al backend, tanto al crear como al editar
	const buildPayload = data => ({
		nombre: data.nombre.trim(),
		descripcion: data.descripcion.trim() || null,
		fecha_inicio: data.fecha_inicio,
		fecha_fin: data.fecha_fin || null,
		estado: data.estado,
		id_empresa: data.id_empresa,
		id_categoria: data.id_categoria,
		id_prioridad: data.id_prioridad,
	});

	const createChallenge = async data => {
		try {
			await axios.post(`${API_URL}/retos`, buildPayload(data));
			// Se vuelve a pedir la lista para traer el reto con el id que genera el backend
			await fetchChallenges();
			markAsUpdated();
			toast.success('Reto creado', { description: data.nombre.trim() });
			closeCreateModal();
		} catch (error) {
			console.error(error);
			toast.error('No se pudo crear el reto', { description: 'Intenta de nuevo más tarde' });
		}
	};

	const updateChallenge = async data => {
		try {
			await axios.put(`${API_URL}/retos/${editingChallenge.id}`, buildPayload(data));
			await fetchChallenges();
			markAsUpdated();
			toast.success('Reto actualizado', { description: data.nombre.trim() });
			closeCreateModal();
		} catch (error) {
			console.error(error);
			toast.error('No se pudo actualizar el reto', { description: 'Intenta de nuevo más tarde' });
		}
	};

	// Si hay un reto en edición actualiza, si no, crea uno nuevo
	const onSubmit = handleSubmit(data => editingChallenge ? updateChallenge(data) : createChallenge(data));

	const deleteChallenge = async challenge => {
		try {
			await axios.delete(`${API_URL}/retos/${challenge.id}`);
			setChallenges(prev => prev.filter(item => item.id !== challenge.id));
			markAsUpdated();
			toast.success('Reto eliminado', { description: challenge.nombre });
		} catch (error) {
			console.error(error);
			toast.error('No se pudo eliminar el reto', { description: 'Verifica que no tenga registros asociados' });
		}
	};

	// Abre la modal con los datos del reto ya cargados en el formulario
	const onEdit = challenge => {
		setEditingChallenge(challenge);
		reset({
			nombre: challenge.nombre ?? '',
			descripcion: challenge.descripcion ?? '',
			fecha_inicio: toDateInput(challenge.fecha_inicio),
			fecha_fin: toDateInput(challenge.fecha_fin),
			estado: challenge.estado ?? 'Pendiente',
			id_empresa: challenge.id_empresa ?? '',
			id_categoria: challenge.id_categoria ?? '',
			id_prioridad: challenge.id_prioridad ?? '',
		});
		setShowCreateModal(true);
	};

	const onDelete = challenge => {
		toast.warning(`¿Eliminar el reto "${challenge.nombre}"?`, {
			description: 'Esta acción no se puede deshacer',
			action: { label: 'Eliminar', onClick: () => deleteChallenge(challenge) },
			cancel: { label: 'Cancelar', onClick: () => { } },
		});
	};

	return <ChallengesContext.Provider value={{ filteredChallenges, loading, search, setSearch, estado, setEstado, estados: ESTADOS, prioridad, setPrioridad, prioridades, categorias, empresas, hasFilters, onEdit, onDelete, showCreateModal, openCreateModal, closeCreateModal, isEditing: Boolean(editingChallenge), register, errors, isSubmitting, onSubmit, validateEndDate }}>
		{children}
	</ChallengesContext.Provider>;
};

export { ChallengesContext, ChallengesProvider };