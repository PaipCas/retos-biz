import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CompaniesPage from './pages/CompaniesPage';
import ChallengesPage from './pages/ChallengesPage';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'sonner';
import Container from './components/container/Container';
import CategoriesPage from './pages/CategoriesPage';
import { CategoriesProvider } from './context/CategoriesContext';
import { ChallengesProvider } from './context/ChallengesContext';
import { DashboardProvider } from './context/DashboardContext';
import PrioritiesPage from './pages/PrioritiesPage';
import { PrioritiesProvider } from './context/PrioritiesContext';
import CompaniesPage from './pages/CompaniesPage';
import { CompaniesProvider } from './context/CompaniesContext';


export default function App() {
	const { isAuthenticated } = useContext(AppContext);
	return (
		<>
			<Routes>
				<Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}></Route>

				<Route element={isAuthenticated ? <DashboardProvider><Container /></DashboardProvider> : <Navigate to="/login" />}>
					<Route path='/' element={<DashboardPage />}></Route>
					<Route path= '/empresas' element={<CompaniesProvider><CompaniesPage /></CompaniesProvider>}></Route>
					<Route path='/retos' element={<ChallengesProvider><ChallengesPage /></ChallengesProvider>}></Route>
					<Route path='/categorias' element={<CategoriesProvider><CategoriesPage /></CategoriesProvider>}></Route>
					<Route path='/prioridades' element={<PrioritiesProvider><PrioritiesPage /></PrioritiesProvider>}></Route>
					{/* <Route path='/registros' element={isAuthenticated ? <RecordsPage /> : <Navigate to="/login" />}></Route> */}
				</Route>
			</Routes >

			<Toaster richColors duration={4000} />
		</>
	);
}