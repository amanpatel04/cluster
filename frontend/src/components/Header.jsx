import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import makeGetRequest from '../utils/getRequest';
import { useDispatch } from 'react-redux';
import { logout, login } from '../features/auth/auth';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkLogin() {
            const response = await makeGetRequest('/user/get', true);
            if (response != null) {
                console.log(response);
                dispatch(login(response.data));
            } else {
                navigate('/login');
            }
        }
        checkLogin();
    }, []);

    const logoutUser = async (event) => {
        event.preventDefault();
        const response = await makeGetRequest('/user/logout', true);
        if (response != null) {
            dispatch(logout());
            navigate('/login');
        } else {
            console.log('Error : while logout');
        }
    };

    const getUserData = async (event) => {
        event.preventDefault();
        const response = await makeGetRequest('/user/get', true);
        if (response != null) {
            console.log(response);
        } else {
            console.log('Error : while getting user data');
        }
    };

    return (
        <>
            <div className="w-full h-16 grid grid-cols-12 gap-1">
                <div className="flex justify-center items-center">
                    <h4 className="text-dark-white bg-dark-pink text-3xl font-poppins font-medium h-16 aspect-square rounded-full flex justify-center items-center hover:cursor-pointer">
                        NAS
                    </h4>
                </div>
                <div className="col-start-2 col-end-11">
                    <div className="flex gap-2 h-full items-center p-3 text-dark-white font-poppins text-xl"></div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-1">
                    <Link to="/profile" onClick={getUserData}>
                        <i className="fa-regular fa-user flex justify-center items-center h-full text-4xl text-dark-white hover:cursor-pointer hover:bg-dark-lite"></i>
                    </Link>
                    <Link to="/logout" onClick={logoutUser}>
                        <i className="fa-solid fa-arrow-right-from-bracket flex justify-center items-center h-full text-4xl text-dark-white hover:cursor-pointer hover:bg-dark-lite"></i>
                    </Link>
                </div>
            </div>
            <hr className="h-[1px] bg-dark-lite border-0" />
        </>
    );
};

export default Header;
