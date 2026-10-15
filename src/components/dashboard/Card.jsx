export default function Card({ title, subtitle, statistics, children }) {
	return (
		<div className="bg-white border border-slate-200 rounded-xl p-5">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-sm">{title}</h2>
					<p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
				</div>

				<div className="flex items-center gap-3 text-xs">{statistics}</div>
			</div>

			{children}
		</div>
	);
}
