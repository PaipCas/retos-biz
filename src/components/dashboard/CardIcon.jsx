const colors = {
	slate: {
		card: 'bg-white border-slate-200 text-slate-900',
		title: 'text-slate-600',
		icon: 'bg-slate-600/10 text-slate-600',
		value: 'text-slate-700'
	},
	red: {
		card: 'bg-red-50 border-red-200 text-red-900',
		title: 'text-red-600',
		icon: 'bg-red-600/10 text-red-600',
		value: 'text-red-700'
	},
	green: {
		card: 'bg-green-50 border-green-200 text-green-900',
		title: 'text-green-600',
		icon: 'bg-green-600/10 text-green-600',
		value: 'text-green-700'
	},
	amber: {
		card: 'bg-amber-50 border-amber-200 text-amber-900',
		title: 'text-amber-600',
		icon: 'bg-amber-600/10 text-amber-600',
		value: 'text-amber-700'
	}
};

export default function CardIcon({ color, title, icon: Icon, value, complement }) {
	const styles = colors[color] ?? colors.slate;
	
	return (
		<div className={`rounded-xl border p-5 flex flex-col justify-between ${styles.card}`}>
			<div className="flex items-center justify-between gap-3">
				<p className={`text-xs uppercase tracking-wide ${styles.title}`}>{title}</p>

				<div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${styles.icon}`}>
					<Icon className='size-4' />
				</div>
			</div>

			<div className="mt-3">
				<p className={`tabular-nums text-3xl ${styles.value}`}>{value.toLocaleString('es-CO')}{complement}</p>
			</div>
		</div>
	);
}