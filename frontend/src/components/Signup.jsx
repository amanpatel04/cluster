import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');

  const validateSignup = (form) => {
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (name === '' || name.length < 3) {
      setErrorMsg('Name must be at least 3 characters long');
      return false;
    }
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
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!validateSignup(formData)) {
      return;
    }
    formData.delete('confirmPassword');
    fetch('/api/v1/user/register', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            navigate('/login');
          } else {
            setErrorMsg(data.message);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className='bg-light-bg-dark dark:bg-dark-bg-dark flex h-screen w-screen items-center justify-center'>
      <div className='card w-11/12 max-w-96'>
        <div>
          <div className='my-4 flex h-10 items-center justify-center'>
            <h4 className='text-light-text dark:text-dark-text text-lg font-semibold'>
              Register
            </h4>
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
            onSubmit={handleSubmit}
            onChange={() => {
              setErrorMsg('');
            }}
          >
            <input
              className='input-text'
              type='text'
              name='name'
              id='name'
              placeholder='Full Name'
            />
            <input
              className='input-text'
              type='email'
              name='email'
              id='email'
              placeholder='abc@xyz.com'
            />

            <input
              className='input-text'
              type='password'
              name='password'
              id='password'
              placeholder='password'
            />
            <input
              className='input-text'
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Password'
            />
            <div className='flex h-40 items-center justify-center'>
              <input className='button-primary' type='submit' value='Sign Up' />
            </div>
          </form>
        </div>
        <hr className='h-line' />
        <div className='text-light-text-muted dark:text-dark-text-muted flex items-center justify-center text-sm font-light'>
          <p>
            Already have an account ?{' '}
            <a className='text-blue-400 underline' href='/login'>
              {' '}
              Login{' '}
            </a>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
