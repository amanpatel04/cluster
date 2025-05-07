import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import makeGetRequest from '../utils/getRequest';

const VideoPlayer = () => {
    const [video, setVideo] = useState(null);
    const myVideoRef = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        async function getVideo() {
            const response = await makeGetRequest(`/video/get/${id}`, true);
            
            if (response !== null) {
                setVideo(response.data);
                myVideoRef.current.src = "http://localhost:8000/" + response.data.path.substr(7);
                myVideoRef.current.load();
            }
        }
        getVideo();
    }, []);

    return (
        <>
            <div className="w-4/5 aspect-video p-3">
                <video controls ref={myVideoRef}>
                    <source src="" type="video/mp4" />
                </video>
            </div>
        </>
    );
};

export default VideoPlayer;
