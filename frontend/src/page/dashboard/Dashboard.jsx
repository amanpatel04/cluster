import React from 'react';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import UserInfo from '../../components/UserInfo';

const Dashboard = () => {
    return (
        <>
            <Header />
            <UserInfo />
            <Sidebar />
        </>
    );
};

export default Dashboard;
