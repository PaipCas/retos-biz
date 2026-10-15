import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'sonner';
import Container from './components/container/Container';
import CategoriesPage from './pages/CategoriesPage';
import { CategoriesProvider } from './context/CategoriesContext';

export default function App() {
	const { isAuthenticated } = useContext(AppContext);
	return (
		<>
			<Routes>
				<Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}></Route>

				<Route element={isAuthenticated ? <Container /> : <Navigate to="/login" />}>
					<Route path='/' element={<DashboardPage />}></Route>
					{/* <Route path='/empresas' element={isAuthenticated ? <CompaniesPage /> : <Navigate to="/login" />}></Route> */}
					{/* <Route path='/retos' element={isAuthenticated ? <ChallengesPage /> : <Navigate to="/login" />}></Route> */}
					<Route path='/categorias' element={<CategoriesProvider><CategoriesPage /></CategoriesProvider>}></Route>
					{/* <Route path='/prioridades' element={isAuthenticated ? <PrioritiesPage /> : <Navigate to="/login" />}></Route> */}
					{/* <Route path='/registros' element={isAuthenticated ? <RecordsPage /> : <Navigate to="/login" />}></Route> */}
				</Route>
			</Routes >

			<Toaster richColors duration={4000} />
		</>
	);
}