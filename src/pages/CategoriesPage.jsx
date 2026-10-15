import { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { CategoriesContext } from '../context/CategoriesContext';
import Title from '../components/container/Title';
import Table from '../components/tables/Table';
import ActionButton from '../components/tables/ActionButton';
import CategoriesToolbar from '../components/categories/CategoriesToolbar';
import CategoryModal from '../components/categories/CategoryModal';

export default function CategoriesPage() {
	const { filteredCategorias, loading, hasFilters, onEdit, onDelete } = useContext(CategoriesContext);

	const columns = [
		{ key: 'nombre', header: 'Nombre', sortable: true, className: 'font-500 text-slate-900 whitespace-nowrap' },
		{ key: 'descripcion', header: 'Descripción', className: 'text-slate-500' },
		{ key: 'area_responsable', header: 'Área responsable', sortable: true, className: 'whitespace-nowrap' },
		{
			key: 'acciones',
			header: 'Acciones',
			align: 'right',
			render: row => (
				<div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 transition-opacity duration-150">
					<ActionButton icon={Pencil} label="Editar categoría" variant="edit" onClick={() => onEdit(row)} />
					<ActionButton icon={Trash2} label="Eliminar categoría" variant="danger" onClick={() => onDelete(row)} />
				</div>
			),
		},
	];

	return (
		<>
			<Title text='Categorías' subtitle='Clasificación de retos por área responsable' />

			<Table columns={columns} data={filteredCategorias} loading={loading} toolbar={<CategoriesToolbar />} emptyMessage={hasFilters ? 'No hay categorías que coincidan con los filtros' : 'Aún no hay categorías registradas'} />

			<CategoryModal />
		</>
	);
}
