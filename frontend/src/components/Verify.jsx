import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

import Button from './ui/Button';
const Verify = () => {
  const [message, setMessage] = useState('waiting for verification...');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/v1/user/verify/?token=${token}`, {
      method: 'GET',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            setMessage(data.message);
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            setMessage(data.message);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    return () => {
      controller.abort();
    };
  }, [token]);

  return (
    <div>
      <div>
        <h1>{message}</h1>
        <Link to='/login'>
          <Button>Go to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Verify;
