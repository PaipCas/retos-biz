import Aside from './Aside';
import Header from './Header';
import Main from './Main';

export default function Container() {
	return (
		<div className="flex h-dvh overflow-hidden bg-slate-50">
			<Aside />

			<div className="flex flex-col flex-1 min-w-0">
				<Header />
				<Main />
			</div>
		</div>
	);
}