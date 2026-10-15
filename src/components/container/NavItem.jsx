import { NavLink } from 'react-router-dom';

export default function NavItem({ link, icon: Icon, text, indicator }) {
	return (
		<div className='relative'>
			<NavLink className='flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 mb-0.5 text-slate-500 hover:bg-slate-600/5 hover:text-slate-900 [.active]:bg-primary-600/10 [.active]:text-primary-600' to={link}>
				<Icon className="size-4.5 shrink-0" />

				<span className="text-sm flex-1 leading-none">{text}</span>

				{indicator && <span className='flex items-center justify-center min-w-4.5 h-4.5 text-[10px] bg-primary-600 text-white rounded-full px-1'>{indicator}</span>}
			</NavLink>
		</div>
	);
}