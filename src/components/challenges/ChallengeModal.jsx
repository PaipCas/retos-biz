import { useContext } from 'react';
import { CircleAlert, LoaderCircle, Plus, Save } from 'lucide-react';
import { ChallengesContext } from '../../context/ChallengesContext';
import Modal from '../container/Modal';
import Input from '../login/Input';
import Select from '../login/Select';

export default function ChallengeModal() {
	const { showCreateModal, closeCreateModal, isEditing, onSubmit, register, errors, isSubmitting, estados, prioridades, categorias, empresas, validateEndDate } = useContext(ChallengesContext);

	const footer = (
		<>
			<button type="button" className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all duration-150" onClick={closeCreateModal}>Cancelar</button>

			<button type="submit" form="challenge-form" disabled={isSubmitting} className="flex items-center gap-2 px-3 py-1.5 text-sm font-500 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
				{isSubmitting ? <LoaderCircle className="size-3.5 animate-spin" /> : isEditing ? <Save className="size-3.5" /> : <Plus className="size-3.5" />}
				{isSubmitting ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear reto'}
			</button>
		</>
	);

	return (
		<Modal open={showCreateModal} onClose={closeCreateModal} title={isEditing ? 'Editar reto' : 'Nuevo reto'} subtitle={isEditing ? 'Modifica los datos del reto' : 'Registra un desafío con su empresa, categoría y prioridad'} footer={footer}>
			<form id="challenge-form" noValidate autoComplete="off" className="space-y-4" onSubmit={onSubmit}>
				<div>
					<Input type="text" id="challenge-name" label="Nombre" placeholder="Ej: Optimización de rutas urbanas" error={errors.nombre} {...register('nombre', {
						required: 'Campo obligatorio',
						validate: value => value.trim() !== '' || 'Campo obligatorio',
						maxLength: { value: 100, message: 'Máximo 100 caracteres' }
					})} data-required />
				</div>

				<div>
					<label htmlFor="challenge-description" className="block text-sm mb-1">Descripción</label>

					<textarea id="challenge-description" rows={3} placeholder="¿Qué busca resolver este reto?" className={`w-full px-3 py-2.5 text-sm border rounded-lg placeholder:text-slate-500 outline-none resize-none transition-all duration-150 focus:ring-2 focus:ring-primary-600/30 ${errors.descripcion ? 'border-red-500' : 'border-slate-200'}`} {...register('descripcion', {
						maxLength: { value: 500, message: 'Máximo 500 caracteres' }
					})} />

					{errors.descripcion && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><CircleAlert className='size-3 shrink-0' /> {errors.descripcion.message}</p>}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<Input type="date" id="challenge-start" label="Fecha de inicio" error={errors.fecha_inicio} {...register('fecha_inicio', {
							required: 'Campo obligatorio'
						})} data-required />
					</div>

					<div>
						<Input type="date" id="challenge-end" label="Fecha de fin" error={errors.fecha_fin} {...register('fecha_fin', {
							validate: validateEndDate
						})} />
					</div>
				</div>

				<div>
					<Select id="challenge-status" label="Estado" error={errors.estado} {...register('estado', { required: 'Campo obligatorio' })}>
						{estados.map(item => <option key={item} value={item}>{item}</option>)}
					</Select>
				</div>

				<div>
					<Select id="challenge-company" label="Empresa" error={errors.id_empresa} {...register('id_empresa', { required: 'Campo obligatorio' })}>
						<option value="">Selecciona una empresa</option>
						{empresas.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
					</Select>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<Select id="challenge-category" label="Categoría" error={errors.id_categoria} {...register('id_categoria', { required: 'Campo obligatorio' })}>
							<option value="">Selecciona una categoría</option>
							{categorias.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
						</Select>
					</div>

					<div>
						<Select id="challenge-priority" label="Prioridad" error={errors.id_prioridad} {...register('id_prioridad', { required: 'Campo obligatorio' })}>
							<option value="">Selecciona una prioridad</option>
							{prioridades.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
						</Select>
					</div>
				</div>
			</form>
		</Modal>
	);
}