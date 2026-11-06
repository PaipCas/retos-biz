import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

function SortIcon({ active, direction }) {
	if (!active) return <ChevronsUpDown className="size-3 text-slate-400" />;
	return direction === 'asc' ? <ChevronUp className="size-3 text-primary-600" /> : <ChevronDown className="size-3 text-primary-600" />;
}

export default function TableHead() {
	const { columns, sort, toggleSort } = useContext(TableContext);

	return (
		<thead>
			<tr className="border-b border-slate-200 bg-slate-50">
				{columns.map(column => (
					<th key={column.key} className={`px-4 py-3 text-xs font-500 uppercase tracking-wide text-slate-500 whitespace-nowrap ${column.align === 'right' ? 'text-right' : 'text-left'}`}>
						{column.sortable ? (
							<button type="button" className="inline-flex items-center gap-1 uppercase tracking-wide hover:text-slate-900 select-none" onClick={() => toggleSort(column.key)}>
								{column.header}
								<SortIcon active={sort.key === column.key} direction={sort.direction} />
							</button>
						) : column.header}
					</th>
				))}
			</tr>
		</thead>
	);
}
