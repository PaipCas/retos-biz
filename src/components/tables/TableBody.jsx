import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

export default function TableBody() {
	const { columns, rows, rowKey, loading, emptyMessage } = useContext(TableContext);

	return (
		<tbody>
			{loading || rows.length === 0 ? (
				<tr>
					<td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-500">
						{loading ? 'Cargando...' : emptyMessage}
					</td>
				</tr>
			) : rows.map(row => (
				<tr key={row[rowKey]} className="group/row border-b border-slate-200 last:border-0 even:bg-slate-50/50 hover:bg-slate-50 transition-colors duration-100">
					{columns.map(column => (
						<td key={column.key} className={`px-4 py-3 text-sm text-slate-700 ${column.align === 'right' ? 'text-right' : ''} ${column.className ?? ''}`}>
							{column.render ? column.render(row) : row[column.key]}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}
