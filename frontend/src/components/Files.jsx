import { useEffect, useState } from 'react';

import apiGateway from '../utils/apiGateway';
import Card from './ui/Card';

const Files = () => {
  const [fileList, setFileList] = useState([]);

  const handleDownloadButton = (index) => {
    const link = document.createElement('a');
    link.href = `/api/v1/other/get/${fileList[index]._id}`;
    link.download = fileList[index].originalname;
    link.click();
    link.remove();
  };

  const handleDelete = (index) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this file?'
    );
    if (!confirm) {
      return;
    }
    apiGateway(`/api/v1/other/delete/${fileList[index]._id}`, 'DELETE', undefined, undefined)
      .then((data) => {
        if (data.success) {
          setFileList(fileList.filter((file) => file !== fileList[index]));
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    apiGateway('/api/v1/other/get', 'GET', undefined, controller)
      .then((data) => {
        if (data.success) {
          setFileList(data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (fileList.length === 0) {
    return <div className='text-center'>No files</div>;
  }

  return (
    <div className='mx-auto grid grid-cols-1 gap-2 md:w-2/3 lg:w-1/2'>
      {fileList.map((file, idx) => {
        return (
          <div key={file._id}>
            <Card className={'h-16 w-full'}>
              <div className='flex h-full w-full'>
                <div className='flex basis-2/12 items-center justify-center'>
                  <span className='material-symbols-outlined'>folder</span>
                </div>
                <div className='grid basis-6/12 grid-rows-3 items-center overflow-hidden'>
                  <h4 className='row-span-2 px-2 text-nowrap'>
                    {file.originalname.substring(0, 30) + '...'}
                  </h4>
                </div>
                <div
                  className='hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex basis-2/12 items-center justify-center hover:cursor-pointer'
                  onClick={() => handleDownloadButton(idx)}
                >
                  <span className='material-symbols-outlined'>download</span>
                </div>
                <div
                  className='hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex basis-2/12 items-center justify-center hover:cursor-pointer'
                  onClick={() => handleDelete(idx)}
                >
                  <span className='material-symbols-outlined'>delete</span>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Files;
