import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/auth';
import apiGateway from '../utils/apiGateway';
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    apiGateway('/api/v1/user/logout', 'GET', undefined, controller)
      .then((data) => {
        if (data.success) {
          dispatch(logout());
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  });
  return <div>Logout</div>;
};

export default Logout;
