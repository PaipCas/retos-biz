import { CircleAlert } from 'lucide-react';

export default function Input({ id, label, error, children, ...props }) {
	return (
		<>
			<label htmlFor={id} className="block text-sm mb-1"> {label}</label>

			<div className="relative">
				<input id={id} className={`w-full px-3 py-2.5 text-sm border rounded-lg placeholder:text-slate-500 outline-none transition-all duration-150 focus:ring-2 focus:ring-primary-600/30 ${error ? 'border-red-500' : 'border-slate-200'}`} {...props} />

				{children}
			</div>

			{error && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><CircleAlert className='size-3 flex-shrink-0' /> {error.message}</p>}
		</>
	);
}
