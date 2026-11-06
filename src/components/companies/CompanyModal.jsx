import { useContext } from 'react';
import { CircleAlert, LoaderCircle, Plus, Save } from 'lucide-react';
import { CompaniesContext } from '../../context/CompaniesContext';
import Modal from '../container/Modal';
import Input from '../login/Input';

export default function CompanyModal() {
    const { showModal, closeModal, onCreate, register, errors, isSubmitting, sectores, editingEmpresa } = useContext(CompaniesContext);

    const footer = (
        <>
            <button 
                type="button" 
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all duration-150" 
                onClick={closeModal}
            >
                Cancelar
            </button>

            <button 
                type="submit" 
                form="company-form" 
                disabled={isSubmitting} 
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-500 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <LoaderCircle className="size-3.5 animate-spin" />
                ) : editingEmpresa ? (
                    <Save className="size-3.5" />
                ) : (
                    <Plus className="size-3.5" />
                )}
                {isSubmitting ? 'Guardando...' : editingEmpresa ? 'Guardar cambios' : 'Crear empresa'}
            </button>
        </>
    );

    return (
        <Modal 
            open={showModal} 
            onClose={closeModal} 
            title={editingEmpresa ? 'Editar empresa' : 'Nueva empresa'} 
            subtitle={editingEmpresa ? 'Modifica los datos corporativos de la empresa' : 'Registra la información corporativa y de contacto de la empresa'} 
            footer={footer}
        >
            <form id="company-form" noValidate autoComplete="off" className="space-y-4" onSubmit={onCreate}>
                
                <div>
                    <Input 
                        type="text" 
                        id="company-nit" 
                        label="NIT" 
                        placeholder="Ej: 900123456-7" 
                        error={errors.nit} 
                        {...register('nit', {
                            required: 'Campo obligatorio',
                            validate: value => value.trim() !== '' || 'Campo obligatorio',
                            maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                        })} 
                        data-required 
                    />
                </div>

                <div>
                    <Input 
                        type="text" 
                        id="company-name" 
                        label="Nombre de la empresa" 
                        placeholder="Ej: Innovación S.A.S." 
                        error={errors.nombre} 
                        {...register('nombre', {
                            required: 'Campo obligatorio',
                            validate: value => value.trim() !== '' || 'Campo obligatorio',
                            maxLength: { value: 150, message: 'Máximo 150 caracteres' }
                        })} 
                        data-required 
                    />
                </div>

                <div>
                    <Input 
                        type="text" 
                        id="company-sector" 
                        label="Sector" 
                        placeholder="Ej: Tecnología" 
                        list="company-sectors" 
                        error={errors.sector} 
                        {...register('sector', {
                            maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                        })} 
                    />
                    <datalist id="company-sectors">
                        {sectores.map(item => <option key={item} value={item} />)}
                    </datalist>
                </div>

                <div>
                    <Input 
                        type="text" 
                        id="company-contacto" 
                        label="Contacto principal" 
                        placeholder="Ej: María Gómez" 
                        error={errors.contacto} 
                        {...register('contacto', {
                            maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                        })} 
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Input 
                            type="email" 
                            id="company-correo" 
                            label="Correo electrónico" 
                            placeholder="Ej: contacto@empresa.com" 
                            error={errors.correo} 
                            {...register('correo', {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo electrónico no válido'
                                },
                                maxLength: { value: 150, message: 'Máximo 150 caracteres' }
                            })} 
                        />
                    </div>
                    <div>
                        <Input 
                            type="tel" 
                            id="company-telefono" 
                            label="Teléfono" 
                            placeholder="Ej: 3001234567" 
                            error={errors.telefono} 
                            {...register('telefono', {
                                maxLength: { value: 30, message: 'Máximo 30 caracteres' }
                            })} 
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <input 
                        type="checkbox" 
                        id="company-activa" 
                        className="size-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600/30 accent-primary-600 cursor-pointer" 
                        {...register('activa')} 
                    />
                    <label htmlFor="company-activa" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                        Empresa activa en el sistema
                    </label>
                </div>

            </form>
        </Modal>
    );
}