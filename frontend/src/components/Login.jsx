import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/auth';
const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const validateLogin = (form) => {
    const email = form.get('email');
    const password = form.get('password');
    if (
      email.trim() === '' ||
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setErrorMsg('Please enter a valid email');
      return false;
    }
    if (password.trim() === '' || password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!validateLogin(formData)) {
      return;
    }
    const res = await fetch('/api/v1/user/login', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      dispatch(login());
    } else {
      console.log(data.message);
      setErrorMsg(data.message);
    }
  };

  return (
    <div className='bg-light-bg-dark dark:bg-dark-bg-dark flex h-screen w-screen items-center justify-center'>
      <div className='card w-11/12 max-w-96'>
        <div>
          <div className='my-4 flex h-10 items-center justify-center'>
            <h4 className='text-lg font-semibold'>Login</h4>
          </div>
          <div className='my-8 flex justify-center overflow-hidden'>
            <p
              className={`${errorMsg ? 'block' : 'hidden'} text-sm font-light text-red-400`}
            >
              {errorMsg}
            </p>
          </div>
          <form
            action=''
            method='post'
            className='grid gap-2'
            onSubmit={handleFormSubmit}
            onChange={() => setErrorMsg('')}
            encType='multipart/form-data'
          >
            <input
              className='input-text'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />

            <input
              className='input-text'
              type='password'
              name='password'
              id='password'
              placeholder='password'
            />
            <div className='my-2 flex justify-end px-2'>
              <a
                className='text-sm font-light text-blue-400 underline'
                href='/resetpassword'
              >
                Forgot Password
              </a>
            </div>
            <div className='flex h-40 items-center justify-center'>
              <input className='button-primary' type='submit' value='Login' />
            </div>
          </form>
        </div>
        <hr className='h-line' />
        <div className='text-light-text-muted dark:text-dark-text-muted flex items-center justify-center text-sm font-light'>
          <p>
            Don't have an account ?{' '}
            <a className='text-blue-400 underline' href='/signup'>
              {' '}
              Signup{' '}
            </a>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
