import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import TransactionsPage from '../pages/TransactionsPage';
import CardsPage from '../pages/CardsPage';
import TransfersPage from '../pages/TransfersPage';
import ExpenseControlPage from '../pages/ExpenseControlPage';
import ProfilePage from '../pages/ProfilePage';

import Sidebar from '../partials/Sidebar';

import ProtectedRoute from '../protectedRoute';
import { useAuth } from '../contexts/AuthContext';

const Router = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            { isAuthenticated && <Sidebar />}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/transacciones' element={<TransactionsPage />} />
                        <Route path='/tarjetas' element={<CardsPage />} />
                        <Route path='/transferencias' element={<TransfersPage />} />
                        <Route path='/control-de-gastos' element={<ExpenseControlPage />} />
                        <Route path='/perfil' element={<ProfilePage />} />
                    </Route>
                </Routes>
            </div >
        </>
    )
}

export default Router