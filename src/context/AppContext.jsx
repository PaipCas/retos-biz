import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

function AppProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
	const [loggedUser, setLoggedUser] = useState(sessionStorage.getItem('loggedUser') || '');
	const [showContainer, setShowContainer] = useState('login');

	useEffect(() => {
		sessionStorage.setItem('isAuthenticated', isAuthenticated);
		sessionStorage.setItem('userName', loggedUser);
	}, [isAuthenticated, loggedUser]);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate();

	const onLogin = async data => {
		try {
			const response = await axios.post('http://localhost:3001/api/login', data);
			alert(`Bienvenido ${response.data.nombre}`);
			setIsAuthenticated(true);
			setLoggedUser(response.data.nombre);
			navigate('/');
		} catch (error) {
			console.error(error);
			alert('El usuario y/o contraseña es incorrecto');
		}
	};

	return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, loggedUser, setLoggedUser, showContainer, setShowContainer, register, handleSubmit, errors, onLogin }}>
		{children}
	</AppContext.Provider>;
};

export { AppContext, AppProvider };