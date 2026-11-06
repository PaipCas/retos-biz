import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';

export default function ChallengesAreaChart({ data }) {
	return (
		<AreaChart className='w-full aspect-[3.42/1]' responsive data={data}>
			<defs>
				<linearGradient id="gradRegistrados" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="var(--color-blue-500)" stopOpacity="0.18"></stop>
					<stop offset="95%" stopColor="var(--color-blue-500)" stopOpacity="0"></stop>
				</linearGradient>

				<linearGradient id="gradResueltos" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="var(--color-green-500)" stopOpacity="0.18"></stop>
					<stop offset="95%" stopColor="var(--color-green-500)" stopOpacity="0"></stop>
				</linearGradient>
			</defs>

			<CartesianGrid strokeDasharray='3 3' stroke='var(--color-slate-200)' />

			<Area type="monotone" dataKey='registrados' stroke='var(--color-blue-500)' strokeWidth={2} dot={false} fill='url(#gradRegistrados)' isAnimationActive={true} name='Registrados' />

			<Area type="monotone" dataKey='resueltos' stroke='var(--color-green-500)' strokeWidth={2} dot={false} fill='url(#gradResueltos)' isAnimationActive={true} name='Resueltos' />

			<XAxis dataKey='name' fontSize={11} stroke='var(--color-slate-500)' strokeWidth={0} />

			<YAxis fontSize={11} stroke='var(--color-slate-500)' strokeWidth={0} allowDecimals={false} />

			<Tooltip content={<CustomTooltip />} />
		</AreaChart>
	);
}
