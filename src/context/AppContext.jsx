import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function getErrorMessage(error) {
	if (error.response) {
		const { status, data } = error.response;

		return data?.error || `Error ${status}`;
	}

	if (error.request) return 'No se pudo conectar con el servidor. ¿Está encendido el backend?';

	return error.message;
}


const AppContext = createContext();

function AppProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
	const [loggedUser, setLoggedUser] = useState(() => {
		const saved = localStorage.getItem('loggedUser');
		return saved ? JSON.parse(saved) : null;
	});
	const [showContainer, setShowContainer] = useState('login');

	useEffect(() => {
		localStorage.setItem('isAuthenticated', isAuthenticated);
		loggedUser ? localStorage.setItem('loggedUser', JSON.stringify(loggedUser)) : localStorage.removeItem('loggedUser');
	}, [isAuthenticated, loggedUser]);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate();

	const onLogin = async data => {
		try {
			const response = await axios.post('http://localhost:3001/api/login', data);
			toast.success('Sesión iniciada correctamente', { description: `Bienvenido a RetosBiz, ${response.data.nombre}` });
			setIsAuthenticated(true);
			setLoggedUser(response.data);
			navigate('/');
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	};

	const onRegister = async data => {
		try {
			const response = await axios.post('http://localhost:3001/api/usuarios', {
				nombre: data.nombre,
				correo: data.correo,
				celular: data.celular,
				contrasena: data.contrasena
			});
			toast.success('Cuenta creada', { description: 'Ya puedes iniciar sesión con tu correo' });
			setShowContainer('login');
		} catch (error) {
			toast.error('No se pudo crear la cuenta', { description: getErrorMessage(error) });
		}
	};

	return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, loggedUser, setLoggedUser, showContainer, setShowContainer, register, handleSubmit, errors, onLogin, onRegister }}>
		{children}
	</AppContext.Provider>;
};

export { AppContext, AppProvider };