import { useContext } from 'react';
import { LoaderCircle, Plus } from 'lucide-react';
import { PrioritiesContext } from '../../context/PrioritiesContext';
import Modal from '../container/Modal';
import Input from '../login/Input';

export default function PriorityModal() {
	const { showCreateModal, closeCreateModal, onCreate, register, errors, isSubmitting, nextLevel, isNameTaken, isLevelTaken } = useContext(PrioritiesContext);

	const footer = (
		<>
			<button type="button" className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all duration-150" onClick={closeCreateModal}>Cancelar</button>

			<button type="submit" form="priority-form" disabled={isSubmitting} className="flex items-center gap-2 px-3 py-1.5 text-sm font-500 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
				{isSubmitting ? <LoaderCircle className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
				{isSubmitting ? 'Guardando...' : 'Crear prioridad'}
			</button>
		</>
	);

	return (
		<Modal open={showCreateModal} onClose={closeCreateModal} title='Nueva prioridad' subtitle='Define la urgencia y el tiempo máximo de respuesta' footer={footer}>
			<form id="priority-form" noValidate autoComplete="off" className="space-y-4" onSubmit={onCreate}>
				<div>
					<Input type="text" id="priority-name" label="Nombre" placeholder="Ej: Muy urgente" error={errors.nombre} {...register('nombre', {
						required: 'Campo obligatorio',
						maxLength: { value: 50, message: 'Máximo 50 caracteres' },
						validate: {
							notEmpty: value => value.trim() !== '' || 'Campo obligatorio',
							unique: value => !isNameTaken(value) || 'Ya existe una prioridad con ese nombre',
						}
					})} data-required />
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<Input type="number" id="priority-level" label="Nivel" placeholder={`Ej: ${nextLevel}`} min={1} step={1} error={errors.nivel} {...register('nivel', {
							valueAsNumber: true,
							required: 'Campo obligatorio',
							validate: {
								number: value => !Number.isNaN(value) || 'Campo obligatorio',
								integer: value => Number.isInteger(value) || 'Debe ser un número entero',
								positive: value => value > 0 || 'Debe ser mayor que 0',
								unique: value => !isLevelTaken(value) || 'Ya existe una prioridad con ese nivel',
							}
						})} data-required />

						<p className="text-[11px] text-slate-500 mt-1">1 es la más urgente. Siguiente libre: {nextLevel}</p>
					</div>

					<div>
						<Input type="number" id="priority-days" label="Días máx. de respuesta" placeholder="Ej: 7" min={1} step={1} error={errors.dias_max_respuesta} {...register('dias_max_respuesta', {
							valueAsNumber: true,
							required: 'Campo obligatorio',
							validate: {
								number: value => !Number.isNaN(value) || 'Campo obligatorio',
								integer: value => Number.isInteger(value) || 'Debe ser un número entero',
								positive: value => value > 0 || 'Debe ser mayor que 0',
							}
						})} data-required />
					</div>
				</div>
			</form>
		</Modal>
	);
}
