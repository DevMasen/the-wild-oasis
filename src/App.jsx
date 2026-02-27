import GloablStyles from './styles/GlobalStyles';
//////////////////////////////////////////////
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
///////////////////////////////////////////////
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
////////////////////////////////////////////////
function App() {
	return (
		<>
			<GloablStyles />
			<BrowserRouter>
				<Routes>
					<Route
						index
						element={<Navigate to="dashboard" replace />}
					/>
					<Route element={<AppLayout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="settings" element={<Settings />} />
						<Route path="users" element={<Users />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
