import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../components/login/Login';
import { AppContext } from '../context/AppContext';

describe('Componente Login', () => {
	it('debe renderizar los campos de correo y contraseña', () => {
		const mockAppContext = { onLogin: vi.fn() };

		render(
			<AppContext.Provider value={mockAppContext}>
				<Login />
			</AppContext.Provider>
		);

		// Buscamos por el texto de la etiqueta asociada al input
		expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
	});

	it('debe permitir interactuar con el formulario de login', () => {
		const handleLoginMock = vi.fn();
		const mockAppContext = { onLogin: handleLoginMock };

		render(
			<AppContext.Provider value={mockAppContext}>
				<Login />
			</AppContext.Provider>
		);

		const inputEmail = screen.getByLabelText(/correo electrónico/i);
		const inputPassword = screen.getByLabelText(/contraseña/i);
		const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

		// Simulamos la escritura en los campos
		fireEvent.change(inputEmail, { target: { value: 'usuario@cesde.edu.co' } });
		fireEvent.change(inputPassword, { target: { value: '123456' } });

		expect(inputEmail.value).toBe('usuario@cesde.edu.co');
		expect(inputPassword.value).toBe('123456');

		// Opcional: simular envío
		fireEvent.click(submitButton);
	});
});