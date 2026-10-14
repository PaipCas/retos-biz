// src/components/ChallengesPage.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import logo from '../assets/images/logo.png';
import logoWhite from '../assets/images/logoWhite.png';

export default function ChallengesPage() {
	const { loggedUser } = useContext(AppContext);
	
	// Estados basados en los campos de la imagen proporcionada
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');
	const [estado, setEstado] = useState('Activo'); // Valor por defecto
	const [idEmpresa, setIdEmpresa] = useState('');
	const [idCategoria, setIdCategoria] = useState('');
	const [idPrioridad, setIdPrioridad] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		
		const nuevoReto = {
			id: crypto.randomUUID(), 
			nombre,
			descripcion,
			fecha_inicio: fechaInicio,
			fecha_fin: fechaFin,
			estado,
			id_empresa: idEmpresa,
			id_categoria: idCategoria,
			id_prioridad: idPrioridad
		};

		console.log('Reto simulado guardado:', nuevoReto);
		alert(`Reto "${nuevoReto.nombre}" registrado correctamente.\nID UUID generado: ${nuevoReto.id}`);
		
		// Limpiar formulario
		setNombre(''); setDescripcion(''); setFechaInicio(''); setFechaFin(''); 
		setEstado('Activo'); setIdEmpresa(''); setIdCategoria(''); setIdPrioridad('');
	};

	return (
		<>
			<div className="min-h-screen flex">
				{/* Panel lateral izquierdo */}
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
							Módulo de Retos · Sistema Activo
						</div>
						<h2 className="text-3xl font-700 text-white leading-tight mb-4 max-w-xs">Panel de Gestión de Retos</h2>
						<p className="text-white/70 text-sm leading-relaxed max-w-xs">Registra y administra los desafíos operacionales propuestos por las entidades para la plataforma.</p>
					</div>

					<div className="relative text-white/40 text-xs">© 2026 RetosBiz · Control de Acceso Protegido</div>
				</div>

				{/* Panel derecho (Formulario) */}
				<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-50 overflow-y-auto">
					<div className="lg:hidden flex items-center gap-2 mb-8">
						<img src={logo} alt="Logo" className='size-9' />
						<span className="text-lg font-700">RetosBiz</span>
					</div>

					<div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
						<div className="mb-6 border-b border-slate-100 pb-4">
							<h3 className="text-xl font-700 text-slate-900">Creación de Nuevo Reto</h3>
							<p className="text-xs text-slate-500 mt-1">Usuario autenticado: <span className="font-600 text-primary-600">{loggedUser || 'Invitado'}</span></p>
						</div>

						<form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
							{/* Nombre del Reto */}
							<div className="sm:col-span-2">
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Nombre del Reto</label>
								<input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Optimización de procesos logísticos" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							{/* Descripción */}
							<div className="sm:col-span-2">
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Descripción</label>
								<textarea required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" placeholder="Detalla de qué trata el reto..." className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all resize-none"></textarea>
							</div>

							{/* Fechas */}
							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Fecha de Inicio</label>
								<input required type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all text-slate-700" />
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Fecha de Fin</label>
								<input required type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all text-slate-700" />
							</div>

							{/* Relaciones e IDs */}
							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">ID Empresa</label>
								<input required type="text" value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)} placeholder="UUID o Código Empresa" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">ID Categoría</label>
								<input required type="text" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} placeholder="UUID o Código Categoría" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all" />
							</div>

							{/* Estado y Prioridad */}
							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Estado</label>
								<select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all text-slate-700">
									<option value="Activo">Activo</option>
									<option value="Pendiente">Pendiente</option>
									<option value="En Progreso">En Progreso</option>
									<option value="Finalizado">Finalizado</option>
								</select>
							</div>

							<div>
								<label className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-1.5">Prioridad (ID o Nivel)</label>
								<select value={idPrioridad} onChange={(e) => setIdPrioridad(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all text-slate-700">
									<option value="" disabled>Selecciona una prioridad</option>
									<option value="Alta">Alta</option>
									<option value="Media">Media</option>
									<option value="Baja">Baja</option>
								</select>
							</div>

							<button type="submit" className="sm:col-span-2 w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-600 py-2.5 rounded-xl transition-all shadow-sm mt-4">
								Registrar Reto
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}