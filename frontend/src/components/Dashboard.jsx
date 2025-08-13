import { useState, useEffect } from 'react';
import byteToHuman from '../utils/byteToHuman';
import apiGateway from '../utils/apiGateway';

import Button from './ui/Button';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    download: 0,
    upload: 0,
    imageSize: 0,
    audioSize: 0,
    videoSize: 0,
    otherSize: 0,
    plan: 'free',
    sizeAllocated: 1,
    recentFiles: [],
  });
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    apiGateway('/api/v1/user/verify/resend/', 'GET', undefined, undefined)
      .then((data) => {
        if (data.success) {
          alert('Resend successful');
        } else {
          alert('Resend failed');
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiGateway('/api/v1/user/info/', 'GET', undefined, controller)
      .then((response) => {
        let data = response.data;
        let total =
          data.imageSize +
          data.audioSize +
          data.videoSize +
          data.otherSize;
        setTotalSize(total);
        setUserInfo(data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      })

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pb-5'>
      <div className='mx-auto grid w-11/12 min-w-96 grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='card grid h-40 grid-cols-2'>
          <h4 className='col-span-2 text-center font-mono text-lg font-semibold'>
            Resource Used
          </h4>
          <p className='flex justify-center text-sm font-light'>
            CPU Usage: {userInfo.cpuUsage}%
          </p>
          <p className='flex justify-center text-sm font-light'>
            RAM Usage: {userInfo.memoryUsage}%
          </p>
          <p className='flex justify-center text-sm font-light'>
            Upload: {byteToHuman(userInfo.upload)}
          </p>
          <p className='flex justify-center text-sm font-light'>
            Download: {byteToHuman(userInfo.download)}
          </p>
        </div>
        <div className='card flex h-40 flex-col justify-around'>
          <h4 className='text-center'>
            {userInfo.sizeAllocated === 0 ? (
              <div className='flex items-center justify-center gap-2'>
                Verify your email to get 10GB storage{' '}
                <Button
                  onClick={handleResend}
                  variant='secondary'
                  className={
                    'dark:border-dark-border border-light-border border'
                  }
                >
                  Resend
                </Button>
              </div>
            ) : (
              `
            ${byteToHuman(totalSize)} used of ${byteToHuman(userInfo.sizeAllocated)}`
            )}
          </h4>
          <div>
            <div className='bg-light-bg-light dark:bg-dark-bg-light h-6 w-full overflow-hidden'>
              <div
                className='dark:bg-dark-secondary h-6 bg-indigo-400'
                style={{
                  width: `${(totalSize / userInfo.sizeAllocated) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className='card flex h-40 justify-between overflow-hidden'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='aspect-square w-6 rounded-full bg-red-400'></div>
            <h4>Video</h4>
            <p className='text-sm font-light'>
              {byteToHuman(userInfo.videoSize)}
            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='aspect-square w-6 rounded-full bg-yellow-400'></div>
            <h4>Image</h4>
            <p className='text-sm font-light'>
              {byteToHuman(userInfo.imageSize)}
            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='aspect-square w-6 rounded-full bg-green-400'></div>
            <h4>Audio</h4>
            <p className='text-sm font-light'>
              {byteToHuman(userInfo.audioSize)}
            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='aspect-square w-6 rounded-full bg-slate-400'></div>
            <h4>Other</h4>
            <p className='text-sm font-light'>
              {byteToHuman(userInfo.otherSize)}
            </p>
          </div>
        </div>
        <div className='card flex h-40 flex-col justify-around'>
          <div>
            <h4 className='text-light-text dark:text-dark-text font-mono font-bold'>
              Plan
            </h4>
          </div>
          <div className='flex items-center gap-2'>
            <input
              className='flex-none'
              type='radio'
              name='plan'
              id='freePlan'
              value='free'
              readOnly
              checked={userInfo.plan === 'free'}
            />
            <label className='font-regular flex-auto' htmlFor='freePlan'>
              Free
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              className='flex-none'
              type='radio'
              name='plan'
              id='premiumPlan'
              value='premium'
              readOnly
              checked={userInfo.plan === 'premium'}
            />
            <label className='font-regular flex-auto' htmlFor='premiumPlan'>
              Premium
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              className='flex-none'
              type='radio'
              name='plan'
              id='enterprisePlan'
              value='enterprise'
              readOnly
              checked={userInfo.plan === 'enterprise'}
            />
            <label className='font-regular flex-auto' htmlFor='enterprisePlan'>
              Enterprise
            </label>
          </div>
        </div>
      </div>
      <div className='card mx-auto w-11/12 md:w-1/2 lg:w-1/3'>
        <table className='w-full text-left'>
          <thead>
            <tr className='bg-light-bg-dark dark:bg-dark-bg-dark rounded border-b text-sm'>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.recentFiles?.map((file) => (
              <tr
                className='border-dark-text-muted dark:border-light-text-muted border-b text-sm font-light'
                key={file._id}
              >
                <td>{file.name.substr(0, 15) + '...'}</td>
                <td>{byteToHuman(file.size)}</td>
                <td>{file.type.split('/')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
