import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../utils/UseApiCall';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function logoutHelper() {
            const response = await useApiCall('/user/logout/', true);
            if (response !== null) {
                localStorage.removeItem('isLoggedIn');
                navigate('/login');
            }
        }
        logoutHelper();
    }, []);

    return <div>Unable to logout</div>;
};

export default Logout;
