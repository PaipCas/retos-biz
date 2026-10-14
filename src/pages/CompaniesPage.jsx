// src/pages/CompaniesPage.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import logo from '../assets/images/logo.png';
import logoWhite from '../assets/images/logoWhite.png';

export default function CompaniesPage() {
	const { loggedUser } = useContext(AppContext);
	const [nombre, setNombre] = useState('');
	const [nit, setNit] = useState('');
	const [sector, setSector] = useState('Tecnología');
	const [contacto, setContacto] = useState('');
	const [correo, setCorreo] = useState('');
	const [telefono, setTelefono] = useState('');
	const [activa, setActiva] = useState(true); // Manejo de booleano

	const handleSubmit = (e) => {
		e.preventDefault();
		
		const nuevaEmpresa = {
			id: crypto.randomUUID(), 
			nombre,
			nit,
			sector,
			contacto,
			correo,
			telefono,
			activa
		};

		console.log('Datos simulados guardados:', nuevaEmpresa);
		alert(`Empresa "${nuevaEmpresa.nombre}" registrada correctamente.\nID UUID generado: ${nuevaEmpresa.id}`);
		
		setNombre(''); setNit(''); setContacto(''); setCorreo(''); setTelefono(''); setActiva(true);
	};

	return (
		<>
			<div className="min-h-screen flex">
				<div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-primary-600 flex-col justify-between p-10 relative overflow-hidden">
					<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
					<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"></div>
					<div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5"></div>

					<div className="relative flex items-center gap-3">
						<img src={logoWhite} alt="Logo" className='size-9' />
						<span className="text-xl font-700 text-white tracking-tight">RetosBiz</span>
					</div>

					<div className="relative">
						<div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-500 px-3 py-1.5 rounded-full mb-6">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
							Módulo de Empresas · Sistema Activo
						</div>
						<h2 className="text-3xl font-700 text-white leading-tight mb-4 max-w-xs">Panel de Gestión Organizacional</h2>
						<p className="text-white/70 text-sm leading-relaxed max-w-xs">Registra y administra las entidades autorizadas para proponer desafíos operacionales en la plataforma.</p>
					</div>

					<div className="relative text-white/40 text-xs">© 2026 RetosBiz · Control de Acceso Protegido</div>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-50">
					<div className="lg:hidden flex items-center gap-2 mb-8">
						<img src={logo} alt="Logo" className='size-9' />
						<span className="text-lg font-700">RetosBiz</span>
					</div>

					<div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
						<div className="mb-6 border-b border-slate-100 pb-4">
							<h3 className="text-xl font-700 text-slate-900">Gestión de Empresas</h3>
							<p className="text-xs text-slate-500 mt-1">Usuario autenticado: <span className="font-600 text-primary-600">{loggedUser || 'Invitado'}</span></p>
						</div>

						<form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
							<div className="sm:col-span-2">
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Nombre de la Empresa</label>
								<input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Tech Solutions S.A.S." className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">NIT</label>
								<input required type="text" value={nit} onChange={(e) => setNit(e.target.value)} placeholder="900.123.456-1" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Sector Industrial</label>
								<select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all">
									<option value="Tecnología">Tecnología</option>
									<option value="Manufactura">Manufactura</option>
									<option value="Educación">Educación</option>
									<option value="Salud">Salud</option>
								</select>
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Nombre de Contacto</label>
								<input required type="text" value={contacto} onChange={(e) => setContacto(e.target.value)} placeholder="Ej. Juan Pérez" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Teléfono</label>
								<input required type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="3101234567" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							<div className="sm:col-span-2">
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
								<input required type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="contacto@empresa.com" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							<div className="sm:col-span-2 flex items-center gap-3 bg-slate-50 p-3 border border-slate-200 rounded-xl mt-1">
								<input type="checkbox" id="activa" checked={activa} onChange={(e) => setActiva(e.target.checked)} className="size-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer" />
								<label htmlFor="activa" className="text-xs font-600 text-slate-700 uppercase tracking-wider cursor-pointer select-none">¿Organización actualmente activa?</label>
							</div>

							<button type="submit" className="sm:col-span-2 w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-600 py-2.5 rounded-xl transition-all shadow-sm mt-2">
								Registrar Organización
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
