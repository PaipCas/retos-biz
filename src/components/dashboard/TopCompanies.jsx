import { BuildingComplex } from 'lucide-react';

export default function TopCompanies({ companies }) {
	if (companies.length === 0) {
		return <p className="text-xs text-slate-500 text-center py-6">Aún no hay empresas con retos registrados</p>;
	}

	return (
		<div className="space-y-1">
			{companies.map((company, index) => (
				<div key={company.id} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-600/5 transition-all duration-150 group/row">
					<span className="text-xs tabular-nums text-slate-500 w-4 shrink-0">{index + 1}</span>

					<div className="size-6 rounded-md bg-primary-600/10 flex items-center justify-center shrink-0">
						<BuildingComplex className='size-2.75 text-primary-600' />
					</div>

					<div className="flex-1 min-w-0">
						<p className="text-xs truncate">{company.name}</p>

						<p className="text-[10px] text-slate-500">{company.sector}</p>
					</div>

					<div className="text-right shrink-0">
						<p className="text-xs tabular-nums">{company.challenges}</p>

						{company.overdue > 0 && <p className="text-[10px] text-red-500">{`${company.overdue} venc.`}</p>}
					</div>
				</div>
			))}
		</div>
	);
}
