import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Input from './Input';

export default function PasswordInput(props) {
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Input type={showPassword ? 'text' : 'password'} placeholder="••••••••••" {...props}>
			<button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 transition-colors" onClick={togglePassword}>
				{showPassword ? <EyeOff className='size-3.75' /> : <Eye className='size-3.75' />}
			</button>
		</Input>
	);
}
