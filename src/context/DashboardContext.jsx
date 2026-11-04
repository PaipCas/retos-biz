import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AppContext } from './AppContext';

const FINISHED_STATUSES = ['Completado', 'Cancelado'];
const CRITICAL_MAX_LEVEL = 2;

function isPastDate(date) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return new Date(`${date}T00:00:00`) < today;
}

// Cantidad de meses que muestra el gráfico de tendencia (el actual y los 11 anteriores)
const TREND_MONTHS = 12;

// Totales acumulados al cierre de cada mes: registrados según fecha_inicio y resueltos según fecha_fin de los completados
function getMonthlyTrend(retos) {
	const today = new Date();

	return Array.from({ length: TREND_MONTHS }, (_, index) => {
		const date = new Date(today.getFullYear(), today.getMonth() - (TREND_MONTHS - 1 - index), 1);
		const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		// "sept." → "sep": sin punto y siempre de tres letras
		const month = date.toLocaleDateString('es-CO', { month: 'short' }).replace('.', '').slice(0, 3);

		// Las claves "AAAA-MM" se pueden comparar como texto: "2026-03" <= "2026-10" es true
		return {
			name: `${month[0].toUpperCase()}${month.slice(1)} ${String(date.getFullYear()).slice(2)}`, // "Oct 26"
			registrados: retos.filter(reto => reto.fecha_inicio?.slice(0, 7) <= key).length,
			resueltos: retos.filter(reto => reto.estado === 'Completado' && reto.fecha_fin?.slice(0, 7) <= key).length,
		};
	});
}

// Color de cada estado en el gráfico de distribución (también define el orden en que aparecen)
const STATUS_COLORS = {
	'Completado': 'var(--color-green-500)',
	'En progreso': 'var(--color-cyan-500)',
	'Pendiente': 'var(--color-blue-500)',
	'Cancelado': 'var(--color-amber-400)',
};

// Cuenta los retos por estado → [{ name: 'Completado', value: 4, percentage: 33.3, fill: '...' }, ...]
function getStatusDistribution(retos) {
	const counts = {};
	retos.forEach(reto => {
		counts[reto.estado] = (counts[reto.estado] ?? 0) + 1;
	});

	// Primero los estados conocidos en su orden; al final cualquier estado nuevo que aparezca en la base de datos
	const statuses = [...Object.keys(STATUS_COLORS).filter(status => counts[status]), ...Object.keys(counts).filter(status => !STATUS_COLORS[status])];

	return statuses.map(status => ({
		name: status,
		value: counts[status],
		percentage: Math.round((counts[status] / retos.length) * 1000) / 10,
		fill: STATUS_COLORS[status] ?? 'var(--color-slate-300)',
	}));
}

// Máximo de categorías en el gráfico de barras, para que las etiquetas no se amontonen
const MAX_CATEGORIES = 10;

// Retos registrados y resueltos (completados) por categoría, de mayor a menor cantidad
function getCategoryStats(retos) {
	const categories = {};

	retos.forEach(reto => {
		const name = reto.categoria ?? 'Sin categoría';
		categories[name] ??= { name, registrados: 0, resueltos: 0 };
		categories[name].registrados++;
		if (reto.estado === 'Completado') categories[name].resueltos++;
	});

	return Object.values(categories)
		.sort((a, b) => b.registrados - a.registrados || a.name.localeCompare(b.name, 'es'))
		.slice(0, MAX_CATEGORIES);
}

// Cantidad de empresas que muestra el ranking
const TOP_COMPANIES = 5;

// Las empresas con más retos, con su sector y cuántos de sus retos están vencidos
function getTopCompanies(retos, empresas) {
	return empresas
		.map(empresa => {
			const companyRetos = retos.filter(reto => reto.id_empresa === empresa.id);

			return {
				id: empresa.id,
				name: empresa.nombre,
				sector: empresa.sector,
				challenges: companyRetos.length,
				overdue: companyRetos.filter(reto => !FINISHED_STATUSES.includes(reto.estado) && reto.fecha_fin && isPastDate(reto.fecha_fin)).length,
			};
		})
		.filter(company => company.challenges > 0)
		.sort((a, b) => b.challenges - a.challenges || a.name.localeCompare(b.name, 'es'))
		.slice(0, TOP_COMPANIES);
}

function getStats(retos, empresas) {
	const activeRetos = retos.filter(reto => !FINISHED_STATUSES.includes(reto.estado));
	const completed = retos.filter(reto => reto.estado === 'Completado').length;
	const cancelled = retos.filter(reto => reto.estado === 'Cancelado').length;

	const evaluable = retos.length - cancelled;
	const completionRate = evaluable > 0 ? Math.round((completed / evaluable) * 1000) / 10 : 0;

	return {
		totalRetos: retos.length,
		inProgressRetos: retos.filter(reto => reto.estado === 'En progreso').length,
		overdueRetos: activeRetos.filter(reto => reto.fecha_fin && isPastDate(reto.fecha_fin)).length,
		completionRate,
		criticalRetos: activeRetos.filter(reto => reto.nivel_prioridad <= CRITICAL_MAX_LEVEL).length,
		activeEmpresas: empresas.filter(empresa => Number(empresa.activa) === 1).length,
		monthlyTrend: getMonthlyTrend(retos),
		statusDistribution: getStatusDistribution(retos),
		categoryStats: getCategoryStats(retos),
		topCompanies: getTopCompanies(retos, empresas),
	};
}

function getInitials(name) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map(word => word[0].toUpperCase())
		.join('');
}

function getCurrentPeriod() {
	const today = new Date();
	const month = today.toLocaleDateString('es-CO', { month: 'long' });

	return `${month[0].toUpperCase()}${month.slice(1)} ${today.getFullYear()}`;
}

// Fecha → "25/10/2026 14:41"
function formatDateTime(date) {
	const day = date.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
	const time = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

	return `${day} ${time}`;
}

function getSavedLastUpdate() {
	const saved = new Date(localStorage.getItem('lastUpdate'));
	return localStorage.getItem('lastUpdate') && !isNaN(saved) ? saved : null;
}

const DashboardContext = createContext();

function DashboardProvider({ children }) {
	const { loggedUser } = useContext(AppContext);
	const [lastUpdate, setLastUpdate] = useState(getSavedLastUpdate);
	const [retos, setRetos] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [loadingStats, setLoadingStats] = useState(true);

	useEffect(() => {
		Promise.all([
			axios.get('http://localhost:3001/api/retos'),
			axios.get('http://localhost:3001/api/empresas'),
		])
			.then(([retosResponse, empresasResponse]) => {
				setRetos(retosResponse.data);
				setEmpresas(empresasResponse.data);
			})
			.catch(error => {
				console.error(error);
				toast.error('No se pudieron cargar las estadísticas del dashboard');
			})
			.finally(() => setLoadingStats(false));
	}, [lastUpdate]);

	const markAsUpdated = useCallback(() => {
		const now = new Date();
		localStorage.setItem('lastUpdate', now.toISOString());
		setLastUpdate(now);
	}, []);

	const userName = loggedUser?.nombre ?? '';
	const userEmail = loggedUser?.correo ?? '';
	const userInitials = userName ? getInitials(userName) : '';
	const currentPeriod = getCurrentPeriod();
	const lastUpdateText = lastUpdate ? formatDateTime(lastUpdate) : 'Sin cambios';
	const stats = getStats(retos, empresas);

	return <DashboardContext.Provider value={{ userName, userEmail, userInitials, currentPeriod, lastUpdateText, markAsUpdated, stats, loadingStats }}>
		{children}
	</DashboardContext.Provider>;
};

export { DashboardContext, DashboardProvider };
