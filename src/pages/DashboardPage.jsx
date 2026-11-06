import { ArrowRight, Building2, CheckCircle2, Clock, Target, TriangleAlert } from 'lucide-react';
import Title from '../components/container/Title';
import CardIcon from '../components/dashboard/CardIcon';
import Card from '../components/dashboard/Card';
import ChallengesAreaChart from '../components/dashboard/ChallengesAreaChart';
import Statistics from '../components/dashboard/Statistics';
import { Link } from 'react-router-dom';
import StatesRadialChart from '../components/dashboard/StatesRadialChart';
import CategoriesBarChart from '../components/dashboard/CategoriesBarChart';
import TopCompanies from '../components/dashboard/TopCompanies';
import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

export default function DashboardPage() {
	const { currentPeriod, stats, loadingStats } = useContext(DashboardContext);
	const show = value => loadingStats ? '—' : value;

	return (
		<div>
			<Title text='Dashboard analítico' subtitle={`Resumen operativo · ${currentPeriod}`} />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
				<div className="md:col-span-2">
					<CardIcon title='Total Retos Registrados' icon={Target} value={show(stats.totalRetos)} />
				</div>

				<CardIcon color='red' title='Retos Vencidos' icon={TriangleAlert} value={show(stats.overdueRetos)} />
				<CardIcon color='green' title='Tasa de Cumplimiento' icon={CheckCircle2} value={show(stats.completionRate)} complement={loadingStats ? '' : '%'} />
				<CardIcon color='amber' title='Retos Críticos Activos' icon={Clock} value={show(stats.criticalRetos)} />
				<CardIcon title='Empresas Activas' icon={Building2} value={show(stats.activeEmpresas)} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
				<div className="lg:col-span-2">
					<Card title='Tendencia de retos' subtitle='Registrados vs. Resueltos' statistics={<Statistics />}>
						<ChallengesAreaChart data={stats.monthlyTrend} />
					</Card>
				</div>

				<Card title='Distribución por estado' subtitle={`Total: ${show(stats.totalRetos).toLocaleString('es-CO')} retos`}>
					<StatesRadialChart data={stats.statusDistribution} />
				</Card>

				<div className="lg:col-span-2">
					<Card title='Retos por categoría' subtitle='Registrados vs. resueltos por categoría' statistics={<Statistics />}>
						<CategoriesBarChart data={stats.categoryStats} />
					</Card>
				</div>

				<Card title='Top empresas' subtitle='Por cantidad de retos' statistics={
					<>
						<Link to='/empresas' className='flex items-center gap-1 text-xs text-primary-600 hover:underline'>
							Ver todas
							<ArrowRight className='size-2.75' />
						</Link>
					</>
				}>
					<TopCompanies companies={stats.topCompanies} />
				</Card>
			</div>
		</div>
	);
}