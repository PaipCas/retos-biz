const colors = {
	slate: { badge: 'bg-slate-50 text-slate-700 border-slate-200', dot: 'bg-slate-500' },
	red: { badge: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
	orange: { badge: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
	yellow: { badge: 'bg-yellow-50 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
	amber: { badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
	green: { badge: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
	emerald: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
	sky: { badge: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
	indigo: { badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
};

export default function Badge({ color = 'slate', dot = false, children }) {
	const styles = colors[color] ?? colors.slate;

	return (
		<span className={`inline-flex items-center gap-1 rounded-full border text-xs px-2 py-0.5 whitespace-nowrap ${styles.badge}`}>
			{dot && <span className={`size-1.5 rounded-full ${styles.dot}`} />}
			{children}
		</span>
	);
}