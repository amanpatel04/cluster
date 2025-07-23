import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    return localStorage.getItem('isLoggedIn') === 'true' ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
