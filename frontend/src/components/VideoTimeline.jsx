import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import byteToHuman from '../utils/byteToHuman';
import Card from './ui/Card';

const VideoTimeline = () => {
  const [videoList, setVideoList] = useState([]);

  const handleDownloadButton = (event, index) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = `/api/v1/video/get/blob/${videoList[index]._id}`;
    link.download = videoList[index].originalname;
    link.click();
    link.remove();
  };

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
    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {videoList.map((video, index) => {
        return (
          <Card className={'aspect-video'} key={video._id}>
            <Link to={`${video._id}/`} className='h-full w-full'>
              <div className='acursor-pointer overflow-hidden'>
                <img
                  className='aspect-video h-full w-full object-cover'
                  src={`/api/v1/video/poster/${video._id}`}
                  alt={video.originalname}
                  loading='lazy'
                />
              </div>
              <div className='relative flex h-14 p-1'>
                <div className='flex-auto overflow-hidden'>
                  <h4 className='font-normal text-nowrap'>
                    {video.originalname.substring(0, 45) + '...'}
                  </h4>
                  <p className='text-center text-sm font-light'>
                    {byteToHuman(video.size)}
                  </p>
                </div>
                <div
                  className='bg-light-bg hover:bg-light-bg-light dark:bg-dark-bg hover:dark:bg-dark-bg-light dark:text-dark-text flex aspect-square basis-1/12 items-center justify-center rounded-full'
                  onClick={(event) => handleDownloadButton(event, index)}
                >
                  <span className='material-symbols-outlined'>download</span>
                </div>
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default VideoTimeline;
