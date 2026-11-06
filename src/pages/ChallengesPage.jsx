import { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ChallengesContext } from '../context/ChallengesContext';
import Title from '../components/container/Title';
import Table from '../components/tables/Table';
import ActionButton from '../components/tables/ActionButton';
import ChallengesToolbar from '../components/challenges/ChallengesToolbar';
import ChallengeModal from '../components/challenges/ChallengeModal';

// Colores del estado del reto
const ESTADO_STYLES = {
	'Pendiente': 'bg-slate-100 text-slate-700',
	'En progreso': 'bg-blue-50 text-blue-700',
	'Completado': 'bg-green-50 text-green-700',
	'Cancelado': 'bg-red-50 text-red-700',
};

const formatDate = value => {
	if (!value) return '—';
	const [year, month, day] = String(value).slice(0, 10).split('-');
	return `${day}/${month}/${year}`;
};

export default function ChallengesPage() {
	const { filteredChallenges, loading, hasFilters, onEdit, onDelete } = useContext(ChallengesContext);

	const columns = [
		{ key: 'nombre', header: 'Nombre del Reto', sortable: true, className: 'font-500 text-slate-900 whitespace-nowrap' },
		{ key: 'descripcion', header: 'Descripción', className: 'text-slate-500 truncate max-w-xs' },
		{ key: 'fecha_inicio', header: 'Fecha Inicio', sortable: true, className: 'whitespace-nowrap', render: row => formatDate(row.fecha_inicio) },
		{ key: 'fecha_fin', header: 'Fecha Fin', sortable: true, className: 'whitespace-nowrap', render: row => formatDate(row.fecha_fin) },
		{
			key: 'estado',
			header: 'Estado',
			sortable: true,
			className: 'whitespace-nowrap',
			render: row => <span className={`px-2 py-0.5 text-xs font-500 rounded-full ${ESTADO_STYLES[row.estado] ?? 'bg-slate-100 text-slate-700'}`}>{row.estado}</span>,
		},
		{ key: 'prioridad', header: 'Prioridad', sortable: true, className: 'whitespace-nowrap' },
		{
			key: 'acciones',
			header: 'Acciones',
			align: 'right',
			render: row => (
				<div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 transition-opacity duration-150">
					<ActionButton icon={Pencil} label="Editar reto" variant="edit" onClick={() => onEdit(row)} />
					<ActionButton icon={Trash2} label="Eliminar reto" variant="danger" onClick={() => onDelete(row)} />
				</div>
			),
		},
	];

	return (
		<>
			<Title text='Retos' subtitle='Gestión y administración de desafíos operacionales' />

			<Table columns={columns} data={filteredChallenges} loading={loading} toolbar={<ChallengesToolbar />} emptyMessage={hasFilters ? 'No hay retos que coincidan con los filtros' : 'Aún no hay retos registrados'} />

			<ChallengeModal />
		</>
	);
}