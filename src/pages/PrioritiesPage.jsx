import { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { PrioritiesContext } from '../context/PrioritiesContext';
import Title from '../components/container/Title';
import Table from '../components/tables/Table';
import Badge from '../components/tables/Badge';
import ActionButton from '../components/tables/ActionButton';
import PrioritiesToolbar from '../components/priorities/PrioritiesToolbar';
import PriorityModal from '../components/priorities/PriorityModal';

export default function PrioritiesPage() {
	const { filteredPrioridades, loading, hasFilters, onEdit, onDelete } = useContext(PrioritiesContext);

	const columns = [
		{ key: 'nivel', header: 'Nivel', sortable: true, className: 'w-20 tabular-nums font-500 text-slate-900' },
		{ key: 'nombre', header: 'Nombre', sortable: true, sortValue: row => row.nivel, render: row => <Badge color={row.rango.color} dot>{row.nombre}</Badge> },
		{ key: 'rango', header: 'Rango', sortable: true, sortValue: row => row.nivel, className: 'text-slate-500', render: row => row.rango.label },
		{ key: 'dias_max_respuesta', header: 'Tiempo máx. de respuesta', sortable: true, className: 'tabular-nums whitespace-nowrap', render: row => `${row.dias_max_respuesta} día${row.dias_max_respuesta === 1 ? '' : 's'}` },
		{
			key: 'acciones',
			header: 'Acciones',
			align: 'right',
			render: row => (
				<div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 transition-opacity duration-150">
					<ActionButton icon={Pencil} label="Editar prioridad" variant="edit" onClick={() => onEdit(row)} />
					<ActionButton icon={Trash2} label="Eliminar prioridad" variant="danger" onClick={() => onDelete(row)} />
				</div>
			),
		},
	];

	return (
		<>
			<Title text='Prioridades' subtitle='Niveles de urgencia y tiempos máximos de respuesta de los retos' />

			<Table columns={columns} data={filteredPrioridades} loading={loading} toolbar={<PrioritiesToolbar />} emptyMessage={hasFilters ? 'No hay prioridades que coincidan con los filtros' : 'Aún no hay prioridades registradas'} />

			<PriorityModal />
		</>
	);
}
