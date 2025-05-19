import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import makePostRequest from '../utils/postRequest.js';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invalidText = useRef(null);

  const loginUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await makePostRequest('/user/login', formData, true);
    if (response !== null) {
      dispatch(login(response.data.user));
      navigate('/');
    } else {
      console.log('Error : while login');
      const element = invalidText.current;
      element.classList.remove('hidden');
    }
  };

  const handleChange = () => {
    const element = invalidText.current;
    if (element.classList.contains('hidden')) return;
    element.classList.add('hidden');
  };

  return (
    <>
      <div className="w-[95%] mx-auto mt-[calc(50vh-11rem)] bg-green-50 rounded p-2 md:w-1/3">
        <div className="flex justify-center">
          <h4 className="w-32 h-10 text-green-500 text-2xl font-medium flex justify-center items-center">
            Login
          </h4>
        </div>
        <div>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={loginUser}
            className="flex flex-col gap-4 mt-6"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="border rounded h-10 px-2 text-lg font-medium focus:outline-none"
            ></input>

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="border rounded h-10 px-2 text-lg font-medium focus:outline-none"
            ></input>

            <div className="">
              <div className="text-right px-3 h-8">
                <p className="text-red-500 font-light hidden" ref={invalidText}>
                  Invalid Email or Password
                </p>
              </div>
              <div className="flex flex-row">
                <div className="basis-3/5 flex justify-center items-center ">
                  <Link
                    to="/forgotPassword"
                    className="text-lg text-indigo-400 underline hover:cursor-pointer"
                  >
                    Forgot Password
                  </Link>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 w-28 h-12 basis-2/5 text-slate-100 rounded font-semibold"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <p> Don't have an account? </p>
        <Link to="/signup" className="underline text-indigo-400">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
