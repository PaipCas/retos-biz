import { BuildingComplex, LayersArrowUp, LayoutDashboard, LogOut, NotepadText, Tags, Target } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import NavItem from './NavItem';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function Aside() {
	const { onLogout } = useContext(AppContext);
	return (
		<aside className='fixed -left-60 [.open]:left-0 md:relative md:left-0 flex flex-col bg-white border-r border-slate-200 sidebar-transition shrink-0 w-60 h-dvh'>
			<div className="flex items-center border-b border-slate-200 px-4 py-4 gap-3">
				<div className="flex items-center">
					<img src={logo} alt="Logo" className='size-8' />
				</div>

				<span className="font-bold text-base tracking-tight">RetosBiz</span>
			</div>

			<nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
				<div className="mb-4">
					<p className="text-xs uppercase tracking-widest text-slate-500 px-2 mb-1 select-none">Principal</p>

					<NavItem link='/' text='Dashboard' icon={LayoutDashboard} />
					<NavItem link='/retos' text='Retos' icon={Target} indicator={5} />
				</div>

				<div className="mb-4">
					<p className="text-xs uppercase tracking-widest text-slate-500 px-2 mb-1 select-none">Gestión</p>

					<NavItem link='/empresas' text='Empresas' icon={BuildingComplex} />
					<NavItem link='/categorias' text='Categorías' icon={Tags} />
					<NavItem link='/prioridades' text='Prioridades' icon={LayersArrowUp} />
					<NavItem link='/registros' text='Registros' icon={NotepadText} />
				</div>
			</nav>

			<div className="border-t border-slate-200 p-2">
				<div className="flex items-center gap-3 px-2 py-2 rounded-lg">
					<div className="size-7 rounded-full bg-primary-600/10 flex items-center justify-center shrink-0">
						<span className="text-xs text-primary-600">JM</span>
					</div>

					<div className="flex-1 min-w-0">
						<p className="text-xs font-60 truncate">Juan Martínez</p>

						<p className="text-[10px] text-slate-500 truncate">jmartinez@correo.com</p>
					</div>

					<button type="button" className="text-slate-500 hover:text-slate-900 transition-colors" onClick={onLogout}>
						<LogOut className='size-3.5' />
					</button>
				</div>
			</div>
		</aside>
	);
}
