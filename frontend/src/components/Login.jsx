import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import makePostRequest from '../utils/postRequest.js';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/auth';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const loginUser = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await makePostRequest('/user/login', formData, true);
        if (response != null) {
            dispatch(login(response.data.user));
            navigate('/');
        } else {
            console.log('Error : while login');
        }
    };

    return (
        <>
            <div className="w-full md:border p-3 mt-[calc(50vh-11rem)] md:rounded-md md:w-96 mx-auto">
                <div className="flex justify-center text-2xl font-medium">
                    <h4> Login </h4>
                </div>
                <div>
                    <form
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={loginUser}
                        className="flex flex-col gap-2 mt-4"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="email"> Email </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="bg-dark-black border-b focus:outline-none text-lg font-medium"
                            ></input>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password"> Password </label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="bg-dark-black border-b focus:outline-none text-lg font-medium"
                            ></input>
                        </div>
                        <div className="flex flex-row px-4 mt-10">
                            <div className="basis-3/5 flex justify-start items-center ">
                                <Link
                                    to="/forgotPassword"
                                    className="text-lg text-slate-300 hover:text-dark-white hover:underline"
                                >
                                    {' '}
                                    Forgot Password{' '}
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="bg-dark-lite w-28 h-12 basis-2/5 font-medium"
                            >
                                {' '}
                                Login{' '}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <p> Don't have an account? </p>
                <Link to="/signup" className="hover:underline">
                    Sign Up
                </Link>
            </div>
        </>
    );
};

export default Login;
