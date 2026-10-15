import { TableProvider } from '../../context/TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';

export default function Table({ columns, data, rowKey = 'id', loading = false, emptyMessage = 'No hay registros para mostrar', toolbar }) {
	return (
		<TableProvider columns={columns} data={data} rowKey={rowKey} loading={loading} emptyMessage={emptyMessage}>
			<div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
				{toolbar && (
					<div className="px-5 py-4 border-b border-slate-200">
						<div className="flex flex-wrap items-center gap-3">{toolbar}</div>
					</div>
				)}

				<div className="overflow-x-auto">
					<table className="w-full">
						<TableHead />
						<TableBody />
					</table>
				</div>
			</div>
		</TableProvider>
	);
}
