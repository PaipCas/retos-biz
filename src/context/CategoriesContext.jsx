import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DashboardContext } from './DashboardContext';

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
	const { markAsUpdated } = useContext(DashboardContext);
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [area, setArea] = useState('');
	const [showModal, setShowModal] = useState(false);
	// Categoría que se está editando; null significa que la modal está en modo "crear"
	const [editingCategoria, setEditingCategoria] = useState(null);
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

	// Abre la modal vacía para crear una categoría nueva
	const openCreateModal = () => {
		setEditingCategoria(null);
		reset({ nombre: '', area_responsable: '', descripcion: '' });
		setShowModal(true);
	};

	// Abre la modal con los datos de la categoría cargados en el formulario
	const onEdit = categoria => {
		setEditingCategoria(categoria);
		reset({
			nombre: categoria.nombre,
			area_responsable: categoria.area_responsable ?? '',
			descripcion: categoria.descripcion ?? '',
		});
		setShowModal(true);
	};

	// Cierra la modal y limpia el formulario para la próxima vez que se abra
	const closeModal = useCallback(() => {
		setShowModal(false);
		setEditingCategoria(null);
		reset();
	}, [reset]);

	const saveCategoria = async data => {
		const isEditing = editingCategoria !== null;
		const categoria = {
			nombre: data.nombre.trim(),
			descripcion: data.descripcion.trim() || null,
			area_responsable: data.area_responsable.trim(),
		};

		try {
			if (isEditing) {
				const response = await axios.put(`http://localhost:3001/api/categorias/${editingCategoria.id}`, categoria);
				setCategorias(prev => prev.map(item => item.id === editingCategoria.id ? { ...item, ...response.data } : item));
			} else {
				const response = await axios.post('http://localhost:3001/api/categorias', categoria);
				setCategorias(prev => [...prev, response.data]);
			}

			markAsUpdated();
			toast.success(isEditing ? 'Categoría actualizada' : 'Categoría creada', { description: categoria.nombre });
			closeModal();
		} catch (error) {
			console.error(error);
			// La columna nombre es UNIQUE: MySQL responde "Duplicate entry" si ya existe
			const isDuplicated = error.response?.data?.error?.includes('Duplicate');
			toast.error(isEditing ? 'No se pudo actualizar la categoría' : 'No se pudo crear la categoría', { description: isDuplicated ? 'Ya existe una categoría con ese nombre' : 'Intenta de nuevo más tarde' });
		}
	};

	const onSubmit = handleSubmit(saveCategoria);

	const deleteCategoria = async categoria => {
		try {
			await axios.delete(`http://localhost:3001/api/categorias/${categoria.id}`);
			setCategorias(prev => prev.filter(item => item.id !== categoria.id));
			markAsUpdated();
			toast.success('Categoría eliminada', { description: categoria.nombre });
		} catch (error) {
			console.error(error);
			toast.error('No se pudo eliminar la categoría', { description: 'Verifica que no tenga retos asociados' });
		}
	};

	const onDelete = categoria => {
		toast.warning(`¿Eliminar la categoría "${categoria.nombre}"?`, {
			description: 'Esta acción no se puede deshacer',
			action: { label: 'Eliminar', onClick: () => deleteCategoria(categoria) },
			cancel: { label: 'Cancelar', onClick: () => { } },
		});
	};

	return <CategoriesContext.Provider value={{ filteredCategorias, loading, search, setSearch, area, setArea, areas, hasFilters, onEdit, onDelete, showModal, editingCategoria, openCreateModal, closeModal, register, errors, isSubmitting, onSubmit }}>
		{children}
	</CategoriesContext.Provider>;
};

export { CategoriesContext, CategoriesProvider };