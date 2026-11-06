import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';

export default function CategoriesBarChart({ data }) {
	return (
		<BarChart className='w-full aspect-[3.13/1]' responsive barGap={15} data={data}>
			<CartesianGrid strokeDasharray='3 3' stroke='var(--color-slate-200)' vertical={false} />

			<Bar dataKey='registrados' fill='var(--color-blue-500)' radius={[4, 4, 0, 0]} isAnimationActive={true} barSize={20} name='Registrados' />

			<Bar dataKey='resueltos' fill='var(--color-green-500)' radius={[4, 4, 0, 0]} isAnimationActive={true} barSize={20} name='Resueltos' />

			<XAxis dataKey='name' fontSize={11} stroke='var(--color-slate-500)' strokeWidth={0} angle={-40} textAnchor='end' height={100} />

			<YAxis fontSize={11} stroke='var(--color-slate-500)' strokeWidth={0} allowDecimals={false} />

			<Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-slate-200)' }} />
		</BarChart>
	);
}