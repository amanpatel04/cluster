import React, { useEffect, useState } from 'react';

import makeGetRequest from '../../utils/getRequest';
import makeDeleteRequest from '../../utils/delelteRequest';
import Sidebar from '../../components/Sidebar';
import { MdOutlineDelete } from 'react-icons/md';

const Image = () => {
    const [images, setImages] = useState([]);
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

    const handleDelete = async(id) => {
        const response = await makeDeleteRequest('/image/delete/' + id, true);
        if (response !== null) {
            window.location.reload();
        }
    };

    const ImageList = images.map((image, index) => {
        return (
            <div className="image overflow-hidden h-48 bg-green-50 relative" key={index}>
                <img
                    className="h-full w-full object-cover"
                    src={image.path.substr(7)}
                    alt={image.filename}
                    srcSet=""
                    onClick={(event) => FullImage(event)}
                />
                <div className='w-10 h-10 bg-red-500 absolute bottom-2 right-2 text-2xl flex justify-center items-center rounded-full hover:cursor-pointer' onClick={() => handleDelete(image._id)}>
                    <MdOutlineDelete className='text-white' />
                </div>
            </div>
        );
    });

    return (
        <>
            <Sidebar />
            <div className="m-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                {ImageList}
            </div>
        </>
    );
};

export default Image;
