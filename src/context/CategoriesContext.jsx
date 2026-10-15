import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [area, setArea] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

	useEffect(() => {
		axios.get('http://localhost:3001/api/categorias')
			.then(response => setCategorias(response.data))
			.catch(error => {
				console.error(error);
				toast.error('No se pudieron cargar las categorías');
			})
			.finally(() => setLoading(false));
	}, []);

	// Áreas sin repetir, en orden alfabético, para las opciones del select
	const areas = [...new Set(categorias.map(categoria => categoria.area_responsable).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));

	const filteredCategorias = categorias.filter(categoria =>
		categoria.nombre.toLowerCase().includes(search.trim().toLowerCase()) &&
		(!area || categoria.area_responsable === area)
	);

	const hasFilters = search.trim() !== '' || area !== '';

	const openCreateModal = () => setShowCreateModal(true);

	// Cierra la modal y limpia el formulario para la próxima vez que se abra
	const closeCreateModal = useCallback(() => {
		setShowCreateModal(false);
		reset();
	}, [reset]);

	const createCategoria = async data => {
		try {
			const response = await axios.post('http://localhost:3001/api/categorias', {
				nombre: data.nombre.trim(),
				descripcion: data.descripcion.trim() || null,
				area_responsable: data.area_responsable.trim(),
			});
			setCategorias(prev => [...prev, response.data]);
			toast.success('Categoría creada', { description: response.data.nombre });
			closeCreateModal();
		} catch (error) {
			console.error(error);
			// La columna nombre es UNIQUE: MySQL responde "Duplicate entry" si ya existe
			const isDuplicated = error.response?.data?.error?.includes('Duplicate');
			toast.error('No se pudo crear la categoría', { description: isDuplicated ? 'Ya existe una categoría con ese nombre' : 'Intenta de nuevo más tarde' });
		}
	};

	const onCreate = handleSubmit(createCategoria);

	const deleteCategoria = async categoria => {
		try {
			await axios.delete(`http://localhost:3001/api/categorias/${categoria.id}`);
			setCategorias(prev => prev.filter(item => item.id !== categoria.id));
			toast.success('Categoría eliminada', { description: categoria.nombre });
		} catch (error) {
			console.error(error);
			toast.error('No se pudo eliminar la categoría', { description: 'Verifica que no tenga retos asociados' });
		}
	};

	const onEdit = categoria => {
		// TODO: abrir el formulario de edición con los datos de la categoría
		console.log('Editar', categoria);
	};

	const onDelete = categoria => {
		toast.warning(`¿Eliminar la categoría "${categoria.nombre}"?`, {
			description: 'Esta acción no se puede deshacer',
			action: { label: 'Eliminar', onClick: () => deleteCategoria(categoria) },
			cancel: { label: 'Cancelar', onClick: () => {} },
		});
	};

	return <CategoriesContext.Provider value={{ filteredCategorias, loading, search, setSearch, area, setArea, areas, hasFilters, onEdit, onDelete, showCreateModal, openCreateModal, closeCreateModal, register, errors, isSubmitting, onCreate }}>
		{children}
	</CategoriesContext.Provider>;
};

export { CategoriesContext, CategoriesProvider };