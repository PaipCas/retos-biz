import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, subtitle, footer, children }) {
	useEffect(() => {
		if (!open) return;

		// Cierra la modal con la tecla Escape
		const handleEscape = event => {
			if (event.key === 'Escape') onClose();
		};

		// Evita que la página de fondo haga scroll mientras la modal está abierta
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open, onClose]);

	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />

			<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white border border-slate-200 rounded-xl shadow-xl">
				<div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200">
					<div>
						<h2 id="modal-title" className="text-base font-600 text-slate-900">{title}</h2>
						{subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
					</div>

					<button type="button" aria-label="Cerrar" className="flex items-center justify-center size-7 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150" onClick={onClose}>
						<X className="size-4" />
					</button>
				</div>

				<div className="px-5 py-4 overflow-y-auto">{children}</div>

				{footer && (
					<div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50 rounded-b-xl">{footer}</div>
				)}
			</div>
		</div>,
		document.getElementById('modal-root')
	);
}
