import { Outlet } from 'react-router-dom';

export default function Main() {
	return (
		<main className='flex-1 min-h-0 overflow-y-auto p-6 xl:p-8 2xl:p-10'>
			<div className="max-w-screen-2xl mx-auto w-full">
				<Outlet />
			</div>
		</main>
	);
}
