export default function Button({ text, icon, ...props }) {
	return (
		<button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-all duration-150 active:scale-95 mt-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed" {...props}>
			{icon}
			{text}
		</button>
	);
}
