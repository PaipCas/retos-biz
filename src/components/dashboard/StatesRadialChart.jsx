import { RadialBar, RadialBarChart, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
	if (!active || !payload?.length) return null;

	const state = payload[0].payload;

	return (
		<div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-xs">
			<p>{state.name}</p>

			<p className='text-slate-500 mt-0.5'>{`${state.value} reto${state.value === 1 ? '' : 's'} · ${state.percentage.toLocaleString('es-CO')}%`}</p>
		</div>
	);
};

export default function StatesRadialChart({ data }) {
	return (
		<>
			<RadialBarChart className='w-full aspect-[1.92/1]' responsive startAngle={90} endAngle={-270} innerRadius={15} barCategoryGap={2} barSize={20} data={data}>
				<RadialBar dataKey='value' cornerRadius={8} isAnimationActive={true} />
				<Tooltip content={<CustomTooltip />} />
			</RadialBarChart>

			<div className="space-y-1.5 mt-2">
				{data.map(state => (
					<div key={state.name} className="flex items-center justify-between text-xs">
						<span className="flex items-center gap-1.5 text-slate-500">
							<span className="size-2 rounded-full shrink-0" style={{ backgroundColor: state.fill }}></span>

							<span>{state.name}</span>
						</span>

						<span className="tabular-nums text-slate-900">{state.value}</span>
					</div>
				))}
			</div>
		</>
	);
}
