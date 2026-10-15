import { useContext } from 'react';
import { CircleAlert, LoaderCircle, Plus } from 'lucide-react';
import { CategoriesContext } from '../../context/CategoriesContext';
import Modal from '../container/Modal';
import Input from '../login/Input';

export default function CategoryModal() {
	const { showCreateModal, closeCreateModal, onCreate, register, errors, isSubmitting, areas } = useContext(CategoriesContext);

	const footer = (
		<>
			<button type="button" className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all duration-150" onClick={closeCreateModal}>Cancelar</button>

			<button type="submit" form="category-form" disabled={isSubmitting} className="flex items-center gap-2 px-3 py-1.5 text-sm font-500 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
				{isSubmitting ? <LoaderCircle className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
				{isSubmitting ? 'Guardando...' : 'Crear categoría'}
			</button>
		</>
	);

	return (
		<Modal open={showCreateModal} onClose={closeCreateModal} title='Nueva categoría' subtitle='Clasifica los retos por tipo y área responsable' footer={footer}>
			<form id="category-form" noValidate autoComplete="off" className="space-y-4" onSubmit={onCreate}>
				<div>
					<Input type="text" id="category-name" label="Nombre" placeholder="Ej: Transformación Digital" error={errors.nombre} {...register('nombre', {
						required: 'Campo obligatorio',
						validate: value => value.trim() !== '' || 'Campo obligatorio',
						maxLength: { value: 100, message: 'Máximo 100 caracteres' }
					})} data-required />
				</div>

				<div>
					<Input type="text" id="category-area" label="Área responsable" placeholder="Ej: Tecnología" list="category-areas" error={errors.area_responsable} {...register('area_responsable', {
						required: 'Campo obligatorio',
						validate: value => value.trim() !== '' || 'Campo obligatorio',
						maxLength: { value: 100, message: 'Máximo 100 caracteres' }
					})} data-required />

					{/* Sugiere las áreas existentes, pero permite escribir una nueva */}
					<datalist id="category-areas">
						{areas.map(item => <option key={item} value={item} />)}
					</datalist>
				</div>

				<div>
					<label htmlFor="category-description" className="block text-sm mb-1">Descripción</label>

					<textarea id="category-description" rows={3} placeholder="¿Qué tipo de retos agrupa esta categoría?" className={`w-full px-3 py-2.5 text-sm border rounded-lg placeholder:text-slate-500 outline-none resize-none transition-all duration-150 focus:ring-2 focus:ring-primary-600/30 ${errors.descripcion ? 'border-red-500' : 'border-slate-200'}`} {...register('descripcion', {
						maxLength: { value: 500, message: 'Máximo 500 caracteres' }
					})} />

					{errors.descripcion && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><CircleAlert className='size-3 shrink-0' /> {errors.descripcion.message}</p>}
				</div>
			</form>
		</Modal>
	);
}
