import React, { useEffect } from 'react';

import makeGetRequest from '../../utils/getRequest';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Image = () => {
    const [images, setImages] = React.useState([]);
    useEffect(() => {
        async function getImages() {
            const response = await makeGetRequest('/image/get', true);
            console.log(response);
            if (response != null) {
                setImages(response.data);
            }
        }
        getImages();
    }, []);

    const ImageList = images.map((image, index) => {
        return (
            <div className="image aspect-square overflow-hidden" key={index}>
                <img
                    src={`localhost:8000/${image.path.substr(7)}`}
                    alt=""
                    srcSet=""
                />
            </div>
        );
    });

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container relative left-12 top-2 grid grid-cols-4 gap-2 p-2">
                {ImageList}
            </div>
        </>
    );
};

export default Image;
