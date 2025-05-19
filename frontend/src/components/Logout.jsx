import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import makeGetRequest from '../utils/getRequest';
import { logout as log } from '../features/auth/auth';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutHelper() {
      const response = await makeGetRequest('/user/logout/', true);
      if (response !== null) {
        dispatch(log());
        navigate('/login');
      }
    }
    logoutHelper();
  }, [dispatch]);

  return <div>Unable to logout</div>;
};

export default Logout;
