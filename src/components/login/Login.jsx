import { useContext } from 'react';
import Button from './Button';
import Input from './Input';
import PasswordInput from './PasswordInput';
import { AppContext } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';

export default function Login() {
	const { onLogin } = useContext(AppContext);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl">Bienvenido de nuevo</h1>

				<p className="text-sm text-slate-500 mt-1">Ingresa tus credenciales para acceder a la plataforma</p>
			</div>

			<form className="space-y-4" autoComplete='off' onSubmit={handleSubmit(onLogin)}>
				<div>
					<Input type="email" id='login-email' label='Correo electrónico' placeholder='usuario@empresa.com' error={errors.correo} {...register('correo', {
						required: 'Campo obligatorio',
						pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' },
						maxLength: { value: 150, message: 'Máximo 150 caracteres' }
					})} data-required />
				</div>

				<div>
					<PasswordInput id={'login-password'} label={'Contraseña'} error={errors.contrasena} {...register('contrasena', {
						required: 'Campo obligatorio',
						minLength: { value: 8, message: 'Mínimo 6 caracteres' },
						maxLength: { value: 16, message: 'Máximo 16 caracteres' }
					})} data-required />
				</div>

				<Button text={isSubmitting ? 'Verificando' : 'Iniciar sesión'} icon={isSubmitting && <LoaderCircle className='size-3.5 animate-spin' />} disabled={isSubmitting} />
			</form>
		</>
	);
}