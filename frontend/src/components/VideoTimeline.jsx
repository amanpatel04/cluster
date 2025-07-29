import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VideoTimeline = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/video/get', {
      method: 'GET',
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            console.log(data);
            setVideoList(data.data);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (videoList.length === 0) {
    return <div className='text-center'>No videos</div>;
  }

  return (
    <div className='flex flex-col gap-2'>
      {videoList.map((video) => {
        return (
          <Link
            to={`/api/v1/video/get/${video}`}
            className='card overflow-hidden rounded-t p-0'
            key={video}
          >
            <div className='aspect-video cursor-pointer overflow-hidden'>
              <img
                className='h-full w-full object-cover'
                src={`http://unsplash.it/1920/1080`}
                alt='video-thumbnail'
              />
            </div>
            <div className='p-2'>
              <h4 className='font-normal'>
                lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h4>
              <p className='text-sm font-light'>Size : 350 MB</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VideoTimeline;
