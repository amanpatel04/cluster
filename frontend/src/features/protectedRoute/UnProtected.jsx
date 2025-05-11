import { useEffect, useState } from 'react';
import makeGetRequest from '../../utils/getRequest.js';
import { login } from '../auth/auth';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const UnProtected = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await makeGetRequest('/user/get', true);
        if (response && response.data) {
          dispatch(login(response.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default UnProtected;
