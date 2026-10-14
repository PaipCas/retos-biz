import Input from './Input';
import Button from './Button';
import PasswordInput from './PasswordInput';

export default function Register() {
	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-700">Crear cuenta</h1>

				<p className="text-sm text-slate-500 mt-1">Registra tu empresa o solicita acceso como administrador</p>
			</div>

			<form className="space-y-4" autoComplete='off'>
				<div>
					<Input type={'text'} name={'name'} label={'Nombre del contacto'} placeholder={'Ej: Valentina Ospina'} required={true} />
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<Input type={'email'} name={'signup-correo'} label={'Correo electrónico'} placeholder={'correo@empresa.com'} required={true} />
					</div>

					<div>
						<Input type={'number'} name={'phone'} label={'Celular'} placeholder={'3012345678'} required={true} />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<PasswordInput name={'signup-password'} label={'Contraseña'} required={true} />
					</div>

					<div>
						<PasswordInput name={'confirmPassword'} label={'Confirmar contraseña'} required={true} />
					</div>
				</div>

				<Button text={'Crear cuenta'} />
			</form>
		</>
	);
}