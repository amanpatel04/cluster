import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import makePostRequest from '../utils/postRequest';

const Signup = () => {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState('');
    const errorElement = useRef(null);

    const validateForm = (formData) => {
        const element = errorElement.current;
        if (formData.get('firstName') === '') {
            setErrorText('First Name is required');
            element.classList.remove('hidden');
            return false;
        }
        if (formData.get('password').length < 8) {
            setErrorText('Password must be at least 8 characters long');
            element.classList.remove('hidden');
            return false;
        }
        if (formData.get('password') !== formData.get('confirmPassword')) {
            setErrorText('Passwords do not match');
            element.classList.remove('hidden');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (validateForm(formData)) {
            formData.delete('confirmPassword');
            const response = await makePostRequest(
                '/user/register/',
                formData,
                false
            );
            if (response !== null) {
                navigate('/login');
            } else {
                const element = errorElement.current;
                setErrorText('Something went wrong');
                element.classList.remove('hidden');
            }
        }
    };

    const handleChange = () => {
        const element = errorElement.current;
        if (element.classList.contains('hidden')) return;
        element.classList.add('hidden');
    };

    return (
        <>
            <div className="p-2 mt-20 bg-green-50 md:w-1/3 md:mx-auto md:mt-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-medium text-green-500">
                        Signup
                    </h1>
                </div>
                <div>
                    <form
                        method="post"
                        encType="multipart/form-data"
                        className="flex flex-col gap-2 mt-4"
                        onSubmit={(event) => handleSubmit(event)}
                        onFocus={handleChange}
                    >
                        <div className="flex justify-end items-center h-20">
                            <label
                                htmlFor="profileImg"
                                className="w-20 h-20 rounded-full hover:cursor-pointer flex justify-center items-center text-3xl bg-green-500 text-slate-100"
                            >
                                {' '}
                                <i className="fa-regular fa-image"></i>{' '}
                            </label>
                            <input
                                type="file"
                                id="profileImg"
                                name="profileImg"
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="focus:outline-none text-lg border rounded h-10 px-2"
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="focus:outline-none text-lg border rounded h-10 px-2"
                            />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="focus:outline-none text-lg border rounded h-10 px-2"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="focus:outline-none text-lg border rounded h-10 px-2"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                            className="focus:outline-none text-lg border rounded h-10 px-2"
                        />
                        <div className="h-8">
                            <p
                                className="text-red-400 text-right px-2 hidden"
                                ref={errorElement}
                            >
                                {errorText}
                            </p>
                        </div>
                        <div className="flex justify-center ">
                            <button
                                type="submit"
                                className="text-white bg-green-500 w-28 h-12 font-poppins font-medium rounded mb-3"
                            >
                                Signup
                            </button>
                        </div>
                        <div className="text-center">
                            Already have an account?
                            <Link
                                to="/login"
                                className="text-indigo-400 underline"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
