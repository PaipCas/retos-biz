import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

export default function App() {
	const isAuthenticated = useContext(AppContext);
	return (
		<>
			<Routes>
				<Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}></Route>

				<Route path='/' element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}></Route>
				<Route path='/empresas' element={isAuthenticated ? <CompaniesPage /> : <Navigate to="/login" />}></Route>
				<Route path='/retos' element={isAuthenticated ? <ChallengesPage /> : <Navigate to="/login" />}></Route>
				<Route path='/categorias' element={isAuthenticated ? <CategoriesPage /> : <Navigate to="/login" />}></Route>
				<Route path='/prioridades' element={isAuthenticated ? <PrioritiesPage /> : <Navigate to="/login" />}></Route>
				<Route path='/registros' element={isAuthenticated ? <RecordsPage /> : <Navigate to="/login" />}></Route>
			</Routes >
		</>
	);
}
