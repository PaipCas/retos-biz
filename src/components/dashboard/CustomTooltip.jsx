export default function CustomTooltip({ active, payload, label }) {
	if (active) {
		return (
			<div className='bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2.5 text-xs'>
				<p className="mb-1.5">{label}</p>

				{payload.map(pl => (
					<div key={pl.name} className="flex items-center gap-2 mb-0.5">
						<span className="size-2 rounded-full" style={{ backgroundColor: pl.color }}></span>
						<span className="text-slate-500">{pl.name}</span>
						<span>{pl.value}</span>
					</div>
				))}
			</div >
		);
	}
}
