import Input from './Input';
import Button from './Button';
import PasswordInput from './PasswordInput';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { LoaderCircle, Send } from 'lucide-react';

export default function Register() {
	const { onRegister } = useContext(AppContext);
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
	const password = watch('contrasena');

	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl">Crear cuenta</h1>

				<p className="text-sm text-slate-500 mt-1">Registra tu empresa o solicita acceso como administrador</p>
			</div>

			<form className="space-y-4" autoComplete='off' onSubmit={handleSubmit(onRegister)}>
				<div>
					<Input type='text' id='name' label='Nombre del contacto' placeholder='Ej: Valentina Ospina' error={errors.nombre} {...register('nombre', {
						required: 'Campo obligatorio',
						minLength: { value: 6, message: 'Mínimo 6 caracteres' },
						maxLength: { value: 100, message: 'Máximo 100 caracteres' }
					})} data-required />
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<Input type="email" id='login-email' label='Correo electrónico' placeholder='usuario@empresa.com' error={errors.correo} {...register('correo', {
							required: 'Campo obligatorio',
							pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' },
							maxLength: { value: 150, message: 'Máximo 150 caracteres' }
						})} data-required />
					</div>

					<div>
						<Input type='number' id='phone' label='Celular' placeholder='3012345678' error={errors.celular} {...register('celular', {
							required: 'Campo obligatorio',
							minLength: { value: 10, message: 'Mínimo 10 digitos' },
							maxLength: { value: 10, message: 'Máximo 10 digitos' }
						})} data-required />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<PasswordInput id='signup-password' label='Contraseña' error={errors.contrasena} {...register('contrasena', {
							required: 'Campo obligatorio',
							pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, message: 'Ingresa una contraseña segura' }
						})} data-required />
					</div>

					<div>
						<PasswordInput id='confirmPassword' label='Confirmar contraseña' error={errors.confirmarContrasena} {...register('confirmarContrasena', {
							required: 'Campo obligatorio',
							validate: value => value === password || 'La contraseña no coincide'
						})} data-required />
					</div>
				</div>

				<Button text={isSubmitting ? 'Creando la cuenta' : 'Crear cuenta'} icon={isSubmitting && <LoaderCircle className='size-3.5 animate-span' />} disabled={isSubmitting} />
			</form>
		</>
	);
}