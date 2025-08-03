import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import byteToHuman from '../utils/byteToHuman';
import Card from './ui/Card';
import { useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [info, setInfo] = useState(false);
  const [video, setVideo] = useState({
    _id: '',
    originalname: '',
    size: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/v1/video/get/meta/${id}`, {
      method: 'GET',
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            setVideo(data.data);
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/api/v1/video/get/blob/${video._id}`;
    link.download = video.originalname;
    link.click();
    link.remove();
  };

  const toggleInfo = () => {
    setInfo(!info);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this video?'
    );
    if (!confirm) {
      return;
    }
    fetch(`/api/v1/video/delete/${video._id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            navigate('/video');
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (!video._id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='w-full md:w-4/5 lg:w-9/12'>
        <video
          className='aspect-video object-contain'
          src={`/api/v1/video/get/blob/${video._id}`}
          poster={`/api/v1/video/poster/${video._id}`}
          controlsList='nodownload'
          controls
        ></video>
      </div>
      <Card className={'my-2 h-12 w-full max-w-[500px]'}>
        <div className='flex h-full w-full items-center justify-between'>
          <div
            className='bg-light-bg dark:bg-dark-bg hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex h-full w-full basis-1/4 cursor-pointer items-center justify-center'
            onClick={toggleInfo}
          >
            <span className='material-symbols-outlined'>info</span>
          </div>
          <div
            className='bg-light-bg dark:bg-dark-bg hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex h-full w-full basis-1/4 cursor-pointer items-center justify-center'
            onClick={handleDownload}
          >
            <span className='material-symbols-outlined'>download</span>
          </div>
          <div className='bg-light-bg dark:bg-dark-bg hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex h-full w-full basis-1/4 cursor-pointer items-center justify-center'>
            <span className='material-symbols-outlined'>share</span>
          </div>
          <div
            className='bg-light-bg dark:bg-dark-bg hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex h-full w-full basis-1/4 cursor-pointer items-center justify-center'
            onClick={handleDelete}
          >
            <span className='material-symbols-outlined'>delete</span>
          </div>
        </div>
      </Card>
      {info && (
        <Card className={'my-2 w-full max-w-[500px] p-2'}>
          <div>
            <div>
              <h4 className='font-medium'>{`Name: ${video.originalname}`}</h4>
            </div>
            <div className='flex flex-nowrap items-center justify-between'>
              <h5 className='text-light-text-muted text-sm font-light'>{`Size: ${byteToHuman(video.size)}`}</h5>
              <p className='text-light-text-muted text-sm font-light'>{`Uploaded On: ${new Date(video.createdAt).toDateString()}`}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VideoPlayer;
