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

    const FullImage = (event) => {
        const element = event.target;
        if (document.fullscreenElement) {
            element.classList.add("object-cover");
            document.exitFullscreen();
        } else {
            element.classList.remove("object-cover");
            element.requestFullscreen();
        }
    };

    const ImageList = images.map((image, index) => {
        return (
            <div className="image overflow-hidden h-48 hover:cursor-pointer" key={index}>
                <img
                    className="h-full w-full object-cover"
                    src={"http://localhost:8000/" + image.path.substr(7)}
                    alt={image.filename}
                    srcSet=""
                    onClick={(event) => FullImage(event)}
                />
            </div>
        );
    });

    return (
        <>
            <Sidebar />
            <div className="container relative left-12 top-2 grid grid-cols-4 gap-2 p-2">
                {ImageList}
            </div>
        </>
    );
};

export default Image;
