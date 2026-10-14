import { BuildingComplex, LayoutDashboard, Tags, Target } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import NavItem from './NavItem';

export default function Aside() {
	return (
		<aside className='relative flex flex-col bg-card border-r border-slate-200 sidebar-transition shrink-0 w-60 h-screen'>
			<div className="flex items-center border-b border-slate-200 px-4 py-4 gap-3">
				<div className="flex items-center">
					<img src={logo} alt="Logo" className='size-8' />
				</div>

				<span className="font-bold text-base text-foreground tracking-tight">RetosBiz</span>
			</div>

			<nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
				<div className="mb-4">
					<p className="text-xs font-500 uppercase tracking-widest text-slate-500 px-2 mb-1 select-none">Principal</p>

					<NavItem link='/' text='Dashboard' icon={LayoutDashboard} />
					<NavItem link='/retos' text='Retos' icon={Target} indicator={5} />
				</div>

				<div className="mb-4">
					<p className="text-xs font-500 uppercase tracking-widest text-slate-500 px-2 mb-1 select-none">Gestión</p>

					<NavItem link='/empresas' text='Empresas' icon={BuildingComplex} />
					<NavItem link='/categorias' text='Categorías' icon={Tags} />
				</div>
			</nav>
		</aside>
	);
}
