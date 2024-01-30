import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext";

function ProtectedRoute() {
    const { user, isAuthenticated, loading } = useAuth();

    if(loading) return <h1>Cargando...</h1>
    if(!loading && !isAuthenticated) return <Navigate to={'/login'} replace />

  return (
    <Outlet/>
  )
}

export default ProtectedRoute;