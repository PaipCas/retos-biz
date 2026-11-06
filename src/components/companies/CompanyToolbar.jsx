import { useContext } from 'react';
import { Plus, Search } from 'lucide-react';
import { CompaniesContext } from '../../context/CompaniesContext';
export default function CompanyToolbar() {
    const { 
        search, 
        setSearch, 
        sector, 
        setSector, 
        sectores, 
        activaFilter, 
        setActivaFilter, 
        filteredEmpresas, 
        openCreateModal 
    } = useContext(CompaniesContext);
    return (
        <>
            {/* Input de búsqueda general (Nombre, NIT o Correo) */}
            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 flex-1 min-w-45 max-w-xs">
                <Search className="size-3.5 text-slate-500 shrink-0" />
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, NIT o correo…" 
                    aria-label="Buscar por nombre, NIT o correo" 
                    className="bg-transparent text-sm placeholder:text-slate-500 outline-none flex-1 min-w-0" 
                    value={search} 
                    onChange={event => setSearch(event.target.value)} 
                />
            </div>
            {/* Selector para filtrar por Sector */}
            <select 
                aria-label="Filtrar por sector" 
                className="text-sm border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-primary-600/30 max-w-48" 
                value={sector} 
                onChange={event => setSector(event.target.value)}
            >
                <option value="">Todos los sectores</option>
                {sectores.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            {/* Selector para filtrar por Estado (Activa / Inactiva) */}
            <select 
                aria-label="Filtrar por estado" 
                className="text-sm border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-primary-600/30 max-w-40" 
                value={activaFilter} 
                onChange={event => setActivaFilter(event.target.value)}
            >
                <option value="">Todos los estados</option>
                <option value="true">Activas</option>
                <option value="false">Inactivas</option>
            </select>
            <div className="flex-1" />
            {/* Contador de resultados */}
            <p className="text-xs text-slate-500">
                <span className="font-600 text-slate-900">{filteredEmpresas.length}</span> empresas
            </p>
            {/* Botón para crear nueva empresa */}
            <button 
                type="button" 
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white text-sm font-500 rounded-lg hover:bg-primary-700 transition-all duration-150 active:scale-95 shrink-0" 
                onClick={openCreateModal}
            >
                <Plus className="size-3.5" />
                Nueva empresa
            </button>
        </>
    );
}
