import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CategoryModal from '../components/categories/CategoryModal';
import { CategoriesContext } from '../context/CategoriesContext';

describe('Componente CategoryModal', () => {
	it('no debe romperse al renderizarse dentro del contexto', () => {
		const mockContextValue = {
			showModal: false,
			editingCategoria: null,
			closeModal: vi.fn(),
			onSubmit: vi.fn(),
			register: vi.fn(() => ({})),
			errors: {},
			isSubmitting: false,
			areas: []
		};

		const { container } = render(
			<CategoriesContext.Provider value={mockContextValue}>
				<CategoryModal />
			</CategoriesContext.Provider>
		);

		// Validamos que el componente monte el contenedor sin arrojar excepciones de contexto
		expect(container).toBeInTheDocument();
	});
});