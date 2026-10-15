import { ChevronDown, LogOut, Menu, RefreshCw } from 'lucide-react';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function Header() {
	const { onLogout } = useContext(AppContext);
	const [showMenu, setShowMenu] = useState(false);

	return (
		<header className="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-6 xl:px-8 shrink-0">
			<button type="button" className="flex md:hidden items-center justify-center hover:bg-slate-200 transition-colors rounded-lg size-8">
				<Menu />
			</button>

			<div className="flex-1"></div>

			<div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
				<RefreshCw className='size-2.75' />
				<span>Actualizado: 12/10/2026 14:41</span>
			</div>

			<div className="relative">
				<button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 transition-all duration-150" onClick={() => setShowMenu(state => !state)}>
					<div className="size-7 rounded-full bg-primary-600/10 flex items-center justify-center">
						<span className="text-xs text-primary-600">JM</span>
					</div>

					<span className="hidden md:block text-sm">Juan Martínez</span>

					<ChevronDown className='size-3 text-slate-500' />
				</button>

				<div className={`absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200 z-50 overflow-hidden ${!showMenu && 'hidden'}`}>
					<div className="px-4 py-3 border-b border-slate-200">
						<p className="text-xs truncate">Juan Martínez</p>

						<p className="text-[10px] text-slate-500 truncate">jmartinez@correo.com</p>
					</div>

					<button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150" onClick={onLogout}>
						<LogOut className='size-3.5' />

						Cerrar Sesión
					</button>
				</div>
			</div>
		</header>
	);
}