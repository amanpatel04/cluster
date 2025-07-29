import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const AuthRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Navigate to='/' replace /> : <Outlet />;
};

export default AuthRoute;
