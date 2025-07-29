import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/auth';
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/user/logout', {
      method: 'GET',
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            dispatch(logout());
          } else {
            console.log(data);
          }
        });
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
