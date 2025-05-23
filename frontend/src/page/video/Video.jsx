import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import poster from '../../assets/default-video-image.png';
import Sidebar from '../../components/Sidebar';
import makeGetRequest from '../../utils/getRequest';
import makeDeleteRequest from '../../utils/delelteRequest';

import { MdOutlineDelete } from 'react-icons/md';

const Video = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const response = await makeGetRequest('/video/get', true);
      if (response !== null) {
        setVideos(response.data);
      }
    }
    getVideos();
  }, []);

  const handleDelete = async (id) => {
    const response = await makeDeleteRequest('/video/delete/' + id, true);
    if (response !== null) {
      window.location.reload();
    }
  };

  const VideoList = videos.map((video, index) => {
    return (
        <div className='relative overflow-hidden' key={index}>
      <Link className="video shadow-sm" to={`/video/${video._id}`}>
        <div className="">
          <img src={poster} />
          <p>
            {video.filename.length > 25
              ? video.filename.substr(0, 25) + '...'
              : video.filename}
          </p>
        </div>
      </Link>
        <div
          className="w-10 h-10 bg-red-500 absolute bottom-2 right-2 text-2xl flex justify-center items-center rounded-full hover:cursor-pointer"
          onClick={() => handleDelete(video._id)}
        >
          <MdOutlineDelete className="text-white" />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="m-2 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {VideoList}
      </div>
      <Sidebar />
    </>
  );
};

export default Video;
