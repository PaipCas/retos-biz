import { useContext } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { RecordsContext } from '../../context/RecordsContext';

const dateClass = 'text-sm border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-primary-600/30';

export default function RecordsToolbar() {
	const {
		search, setSearch,
		estado, setEstado,
		fechaDesde, setFechaDesde,
		fechaHasta, setFechaHasta,
		estados, filteredRecords, openCreateModal
	} = useContext(RecordsContext);

	const hasFilters = search || estado || fechaDesde || fechaHasta;

	const clearFilters = () => {
		setSearch('');
		setEstado('');
		setFechaDesde('');
		setFechaHasta('');
	};

	return (
		<>
			<div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 flex-1 min-w-45 max-w-xs">
				<Search className="size-3.5 text-slate-500 shrink-0" />
				<input type="text" placeholder="Buscar en observación…" aria-label="Buscar en observación" className="bg-transparent text-sm placeholder:text-slate-500 outline-none flex-1 min-w-0" value={search} onChange={event => setSearch(event.target.value)} />
			</div>

			<select aria-label="Filtrar por estado" className="text-sm border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-primary-600/30 max-w-48" value={estado} onChange={event => setEstado(event.target.value)}>
				<option value="">Todos los estados</option>
				{estados.map(item => <option key={item} value={item}>{item}</option>)}
			</select>

			<div className="flex items-center gap-1.5">
				<input type="date" aria-label="Fecha desde" className={dateClass} value={fechaDesde} max={fechaHasta || undefined} onChange={event => setFechaDesde(event.target.value)} />
				<span className="text-xs text-slate-500">a</span>
				<input type="date" aria-label="Fecha hasta" className={dateClass} value={fechaHasta} min={fechaDesde || undefined} onChange={event => setFechaHasta(event.target.value)} />
			</div>

			{hasFilters && (
				<button type="button" className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-600 rounded-lg hover:bg-slate-100 transition-all duration-150" onClick={clearFilters}>
					<X className="size-3.5" />
					Limpiar
				</button>
			)}

			<div className="flex-1" />

			<p className="text-xs text-slate-500"><span className="font-600 text-slate-900">{filteredRecords.length}</span> registros</p>

			<button type="button" className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white text-sm font-500 rounded-lg hover:bg-primary-700 transition-all duration-150 active:scale-95 shrink-0" onClick={openCreateModal}>
				<Plus className="size-3.5" />
				Nuevo registro
			</button>
		</>
	);
}