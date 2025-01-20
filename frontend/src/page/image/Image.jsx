import React, { useEffect } from 'react';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Image = () => {
    useEffect(() => {
        console.log('working');
    }, []);
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container relative left-12 top-2 grid grid-cols-4 gap-2 p-2">
                <div className="image aspect-square overflow-hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1733514692259-57cdff0a750f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        srcSet=""
                    />
                </div>
                <div className="image aspect-square overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1735287367310-2648443f086f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        srcSet=""
                    />
                </div>
                <div className="image aspect-square overflow-hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1733514692259-57cdff0a750f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        srcSet=""
                    />
                </div>
                <div className="image aspect-square overflow-hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1733514692259-57cdff0a750f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        srcSet=""
                    />
                </div>
                <div className="image aspect-square overflow-hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1733514692259-57cdff0a750f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        srcSet=""
                    />
                </div>
            </div>
        </>
    );
};

export default Image;
