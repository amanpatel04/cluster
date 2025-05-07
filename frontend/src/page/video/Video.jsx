import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import poster from '../../assets/default-video-image.png'
import Sidebar from '../../components/Sidebar'
import makeGetRequest from '../../utils/getRequest'

const Video = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideos() {
            const response = await makeGetRequest('/video/get', true);
            if (response != null) {
                setVideos(response.data);
            }
        }
        getVideos();
    }, []);

    const VideoList = videos.map((video, index) => {
        return (
            <Link 
                className="video" 
                key={index}
                to={`/video/${video._id}`}
                >
                <div className=''>
                    <img src = {poster}/>
                    <p>{(video.filename.length > 25 ? video.filename.substr(0, 25) + '...' : video.filename)}</p>
                </div>
            </Link>
        );
    });

  return (
    <>
        <div className='container relative left-12 top-2 grid grid-cols-4 gap-2 p-3'>
            {VideoList}
        </div>
        <Sidebar />
    </>
  )
}

export default Video