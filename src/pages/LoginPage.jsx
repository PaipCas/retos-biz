import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Login from '../components/login/Login';
import Register from '../components/login/Register';
import logo from '../assets/images/logo.png';
import logoWhite from '../assets/images/logoWhite.png';

export default function LoginPage() {
	const { showContainer, setShowContainer } = useContext(AppContext);
	const tabs = [
		{ value: 'login', label: 'Iniciar sesión' },
		{ value: 'register', label: 'Registrarse' }
	];

	return (
		<>
			<div className="min-h-screen flex">
				<div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-primary-600 flex-col justify-between p-10 relative overflow-hidden">
					<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

					<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"></div>

					<div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5"></div>

					<div className="relative flex items-center gap-3">
						<div className="flex items-center">
							<img src={logoWhite} alt="Logo" className='size-9' />
						</div>

						<span className="text-xl text-white tracking-tight">RetosBiz</span>
					</div>

					<div className="relative">
						<div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full mb-6">
							<span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
							Plataforma activa · 94 empresas
						</div>

						<h2 className="text-3xl text-white leading-tight mb-4 max-w-xs">Gestiona los retos empresariales con claridad y control.</h2>

						<p className="text-white/70 text-sm leading-relaxed max-w-xs">Registra, prioriza y resuelve desafíos operativos en un solo lugar. Analítica en tiempo real para decisiones más rápidas.</p>

						<div className="grid grid-cols-3 gap-4 mt-8">
							<div className="bg-white/10 rounded-xl p-3">
								<p className="text-xl tabular-nums text-white">1.284</p>

								<p className="text-white/60 text-[11px] mt-0.5">Retos totales</p>
							</div>

							<div className="bg-white/10 rounded-xl p-3">
								<p className="text-xl tabular-nums text-white">73.4%</p>

								<p className="text-white/60 text-[11px] mt-0.5">Cumplimiento</p>
							</div>

							<div className="bg-white/10 rounded-xl p-3">
								<p className="text-xl tabular-nums text-white">94</p>

								<p className="text-white/60 text-[11px] mt-0.5">Empresas</p>
							</div>
						</div>
					</div>

					<div className="relative text-white/40 text-xs">© 2026 RetosBiz · Plataforma de Analítica Empresarial</div>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-50">
					<div className="lg:hidden flex items-center gap-2 mb-8">
						<div className="flex items-center">
							<img src={logo} alt="Logo" className='size-9' />
						</div>

						<span className="text-lg">RetosBiz</span>
					</div>

					<div className="w-full max-w-md">
						<div className="flex bg-slate-100 rounded-xl p-1 mb-8">
							{tabs.map((tab, index) => (
								<button key={index} className={`flex-1 py-2 text-sm rounded-lg transition-all duration-200 text-slate-500 hover:text-slate-900 [.active]:bg-white [.active]:shadow-sm [.active]:text-slate-900 ${showContainer === tab.value ? 'active' : ''}`} onClick={() => setShowContainer(tab.value)}>{tab.label}</button>
							))}
						</div>

						<div>{showContainer === 'login' ? <Login /> : <Register />}</div>
					</div>
				</div>
			</div>
		</>
	);
}
