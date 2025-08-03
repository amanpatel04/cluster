import { useState, useRef, useEffect } from 'react';

import Button from './ui/Button';

const Image = ({ id, close, next, prev, handleDelete, ...props }) => {
  const [showButton, setshowButton] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          next();
          break;
        case 'ArrowLeft':
          prev();
          break;
        case 'Escape':
          close();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, next, prev]);

  const handleMoveMove = () => {
    setshowButton(true);
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setshowButton(false);
      timeout.current = null;
    }, 3000);
  };

  const handleDownload = async () => {
    const link = document.createElement('a');
    link.href = `/api/v1/image/get/blob/${id}`;
    link.download = id;
    link.click();
    link.remove();
  };

  return (
    <div
      className='fixed top-0 right-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md dark:bg-white/30'
      onMouseMove={handleMoveMove}
    >
      <div
        className={`absolute top-0 right-0 ${showButton ? 'flex' : 'hidden'} h-full w-full flex-col gap-2 p-4`}
      >
        {/* Topbar */}
        <div className='flex items-center justify-between'>
          <Button
            className={'aspect-square w-10 rounded-full lg:w-14'}
            onClick={close}
            variant='secondary'
          >
            <span className='material-symbols-outlined'>
              <span className='material-symbols-outlined'>
                arrow_back_ios_new
              </span>
            </span>
          </Button>
          <div className='flex flex-nowrap gap-1'>
            <Button
              className={'aspect-square w-10 rounded-full lg:w-14'}
              onClick={handleDelete}
              variant='secondary'
            >
              <span className='material-symbols-outlined'>delete</span>
            </Button>
            <Button
              className='bg-light-bg-light/20 dark:bg-dark-bg-light/20 flex aspect-square w-10 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-400/50 lg:w-14'
              onClick={handleDownload}
              variant='secondary'
            >
              <span className='material-symbols-outlined'>download</span>
            </Button>
          </div>
        </div>
        {/* Previous and next buttons */}
        <div className='absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between'>
          <Button
            className={'aspect-square w-10 rounded-full lg:w-14'}
            onClick={prev}
            variant='secondary'
          >
            <span className='material-symbols-outlined'>arrow_back_ios</span>
          </Button>
          <Button
            className={'aspect-square w-10 rounded-full lg:w-14'}
            onClick={next}
            variant='secondary'
          >
            <span className='material-symbols-outlined'>arrow_forward_ios</span>
          </Button>
        </div>
      </div>
      <img
        src={`/api/v1/image/get/blob/${id}`}
        alt={props.alt}
        className='max-h-full max-w-full'
      />
    </div>
  );
};

export default Image;
