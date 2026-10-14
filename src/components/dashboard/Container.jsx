import Aside from './Aside';
import Header from './Header';
import Main from './Main';

export default function Container() {
	return (
		<div className="flex min-h-screen bg-slate-100">
			<Aside />

			<div className="flex flex-col flex-1 min-w-0">
				<Header />
				<Main />
			</div>
		</div>
	);
}