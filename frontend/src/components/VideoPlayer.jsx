import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {useApiCall} from '../utils/UseApiCall'

const VideoPlayer = () => {
    const myVideoRef = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        async function getVideo() {
            const response = await useApiCall(`/video/get/${id}`, true);
            
            if (response !== null) {
                myVideoRef.current.src = response.data.path.substr(6);
                myVideoRef.current.load();
            }
        }
        getVideo();
    }, []);

    return (
        <>
            <div className="w-full md:w-4/5 aspect-video p-3">
                <video controls ref={myVideoRef}>
                    <source src="" type="video/mp4" />
                </video>
            </div>
        </>
    );
};

export default VideoPlayer;
