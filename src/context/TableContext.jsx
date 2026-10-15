import { createContext, useState } from 'react';

function compare(a, b) {
	if (a == null) return 1;
	if (b == null) return -1;
	return typeof a === 'string' ? a.localeCompare(b, 'es') : a - b;
}

const TableContext = createContext();

function TableProvider({ columns, data, rowKey, loading, emptyMessage, children }) {
	const [sort, setSort] = useState({ key: null, direction: 'asc' });

	const toggleSort = key => {
		setSort(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
	};

	const sortColumn = columns.find(column => column.key === sort.key);
	const rows = sortColumn
		? [...data].sort((a, b) => {
			const getValue = sortColumn.sortValue ?? (row => row[sortColumn.key]);
			const result = compare(getValue(a), getValue(b));
			return sort.direction === 'asc' ? result : -result;
		})
		: data;

	return <TableContext.Provider value={{ columns, rows, rowKey, loading, emptyMessage, sort, toggleSort }}>
		{children}
	</TableContext.Provider>;
};

export { TableContext, TableProvider };
