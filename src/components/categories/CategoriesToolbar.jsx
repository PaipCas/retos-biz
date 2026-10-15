import { useContext } from 'react';
import { Plus, Search } from 'lucide-react';
import { CategoriesContext } from '../../context/CategoriesContext';

export default function CategoriesToolbar() {
	const { search, setSearch, area, setArea, areas, filteredCategorias, openCreateModal } = useContext(CategoriesContext);

	return (
		<>
			<div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 flex-1 min-w-45 max-w-xs">
				<Search className="size-3.5 text-slate-500 shrink-0" />
				<input type="text" placeholder="Buscar por nombre…" aria-label="Buscar por nombre" className="bg-transparent text-sm placeholder:text-slate-500 outline-none flex-1 min-w-0" value={search} onChange={event => setSearch(event.target.value)} />
			</div>

			<select aria-label="Filtrar por área responsable" className="text-sm border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-primary-600/30 max-w-48" value={area} onChange={event => setArea(event.target.value)}>
				<option value="">Todas las áreas</option>
				{areas.map(item => <option key={item} value={item}>{item}</option>)}
			</select>

			<div className="flex-1" />

			<p className="text-xs text-slate-500"><span className="font-600 text-slate-900">{filteredCategorias.length}</span> categorías</p>

			<button type="button" className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white text-sm font-500 rounded-lg hover:bg-primary-700 transition-all duration-150 active:scale-95 shrink-0" onClick={openCreateModal}>
				<Plus className="size-3.5" />
				Nueva categoría
			</button>
		</>
	);
}
