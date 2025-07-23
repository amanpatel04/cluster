import { Outlet, Navigate } from 'react-router-dom';

const UnProtected = () => {
    return localStorage.getItem('isLoggedIn') !== null ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    );
};

export default UnProtected;
