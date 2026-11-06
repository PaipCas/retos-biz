const variants = {
	default: 'hover:bg-slate-100 hover:text-slate-900',
	edit: 'hover:bg-slate-100 hover:text-primary-600',
	danger: 'hover:bg-red-50 hover:text-red-600',
};

export default function ActionButton({ icon: Icon, label, variant = 'default', onClick }) {
	return (
		<div className="relative group/btn">
			<button type="button" aria-label={label} className={`flex items-center justify-center size-7 rounded-md text-slate-500 transition-all duration-150 ${variants[variant]}`} onClick={onClick}>
				<Icon className="size-3.5" />
			</button>

			<div className="absolute bottom-full right-0 mb-1 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity">
				{label}
			</div>
		</div>
	);
}
