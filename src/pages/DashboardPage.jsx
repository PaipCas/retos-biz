import { ArrowRight, Building2, CheckCircle2, Clock, Target, TriangleAlert } from 'lucide-react';
import Title from '../components/container/Title';
import CardIcon from '../components/dashboard/CardIcon';
import Card from '../components/dashboard/Card';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
	return (
		<div>
			<Title text='Dashboard analítico' subtitle='Resumen operativo · Octubre 2026' />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
				<div className="md:col-span-2">
					<CardIcon title='Total Retos Registrados' icon={Target} value={1284} />
				</div>

				<CardIcon color='red' title='Retos Vencidos' icon={TriangleAlert} value={38} />
				<CardIcon color='green' title='Tasa de Cumplimiento' icon={CheckCircle2} value={73.4} complement='%' />
				<CardIcon color='amber' title='Retos Críticos Activos' icon={Clock} value={12} />
				<CardIcon title='Empresas Activas' icon={Building2} value={94} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
				<div className="lg:col-span-2">
					<Card title='Tendencia de retos' subtitle='Registrados vs. Resueltos' statistics={
						<>
							<span className='flex items-center gap-1.5 text-slate-500'>
								<span className='size-2 rounded-full bg-green-600' />
								Registrados
							</span>

							<span className='flex items-center gap-1.5 text-slate-500'>
								<span className='size-2 rounded-full bg-blue-600' />
								Resueltos
							</span>
						</>
					} />
				</div>

				<Card title='Distribución por Estado' subtitle='Total: 1.284 retos' />

				<div className="lg:col-span-2">
					<Card title='Retos por Categoría' subtitle='Registrados vs. resueltos por área responsable' statistics={
						<>
							<span className='flex items-center gap-1.5 text-slate-500'>
								<span className='size-2 rounded-full bg-green-600' />
								Registrados
							</span>

							<span className='flex items-center gap-1.5 text-slate-500'>
								<span className='size-2 rounded-full bg-blue-600' />
								Resueltos
							</span>
						</>
					} />
				</div>

				<Card title='Top Empresas' subtitle='Por retos abiertos' statistics={
					<>
						<Link to='/empresas' className='flex items-center gap-1 text-xs text-primary-600 hover:underline'>
							Ver todas
							<ArrowRight className='size-2.75' />
						</Link>
					</>
				} />
			</div>
		</div>
	);
}