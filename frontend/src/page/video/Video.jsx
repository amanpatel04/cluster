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
        <div className='m-2 shadow-md grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4'>
            {VideoList}
        </div>
        <Sidebar />
    </>
  )
}

export default Video