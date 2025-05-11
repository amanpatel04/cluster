import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../auth/auth';
import makeGetRequest from '../../utils/getRequest.js';
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await makeGetRequest('/user/get', true);
                if (response && response.data) {
                    dispatch(login(response.data));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
