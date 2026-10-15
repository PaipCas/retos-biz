export default function Title({ text, subtitle }) {
	return (
		<div className="flex items-center justify-between mb-6">
			<div>
				<h1 className="text-2xl">{text}</h1>

				<p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
			</div>
		</div>
	);
}