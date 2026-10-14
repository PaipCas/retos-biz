import { useEffect, useState } from 'react';

export default function useLocalStorage(itemName, initialValue) {
	const [item, setItem] = useState(initialValue);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		try {
			const localStorageItem = localStorage.getItem(itemName);
			const parsedItem = JSON.parse(localStorageItem) || initialValue;

			setItem(parsedItem);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	const saveItem = newItem => {
		localStorage.setItem(itemName, JSON.stringify(newItem));
		setItem(newItem);
	};

	return { item, saveItem, loading, error };
}
