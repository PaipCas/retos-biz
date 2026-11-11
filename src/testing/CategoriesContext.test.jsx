import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoriesProvider, CategoriesContext } from '../context/CategoriesContext';
import { DashboardContext } from '../context/DashboardContext';
import { useContext } from 'react';

// Mockeamos fetch para evitar peticiones reales de red
vi.stubGlobal('fetch', vi.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve([]),
	})
));

const ComponenteDePrueba = () => {
	const context = useContext(CategoriesContext);
	return (
		<div>
			<span data-testid="context-loaded">{context ? 'loaded' : 'loading'}</span>
		</div>
	);
};

describe('Contexto CategoriesContext', () => {
	it('debe proveer el contexto de categorías sin errores', () => {
		const mockDashboardContext = {
			markAsUpdated: vi.fn()
		};

		render(
			<DashboardContext.Provider value={mockDashboardContext}>
				<CategoriesProvider>
					<ComponenteDePrueba />
				</CategoriesProvider>
			</DashboardContext.Provider>
		);

		const indicador = screen.getByTestId('context-loaded');
		expect(indicador.textContent).toBe('loaded');
	});
});