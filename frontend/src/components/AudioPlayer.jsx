import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

const AudioPlayer = ({
  song,
  className,
  setIndex,
  setIsPlayingList,
  nextSong,
  removeFromList,
}) => {
  const [songProgress, setSongProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const src = `/api/v1/audio/get/blob/${song._id}`;

  const handleTimeUpdate = (event) => {
    const totalTime = event.target.duration;
    const currentTime = event.target.currentTime;
    setSongProgress((currentTime / totalTime) * 100);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn('Could not play audio:', err);
      });
    }
  };

  const handleSeek = (event) => {
    let element;
    if (event.target.id === 'seekbar') {
      element = event.target;
    } else {
      element = event.target.parentElement;
    }
    const bar = element.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percentage = clickX / bar.width;
    const audio = audioRef.current;
    audio.currentTime = audio.duration * percentage;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPlayingList(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsPlayingList(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsPlayingList(false);
    nextSong();
  };

  const handleClose = () => {
    setIndex(-1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/api/v1/audio/get/blob/${song._id}`;
    link.download = song.originalname;
    link.click();
    link.remove();
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this audio?'
    );
    if (!confirm) {
      return;
    }
    fetch(`/api/v1/audio/delete/${song._id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      res.json().then((data) => {
        if (data.success) {
          removeFromList(song._id);
          setIndex(-1);
        }
      });
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      audio.play().catch((err) => {
        console.warn('Could not play audio:', err);
      });
    };

    // Clean up any existing source
    audio.pause();
    audio.removeAttribute('src');
    audio.load();

    // Set new src and wait for buffering
    audio.src = src;
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('ended', handleEnded);
    audio.load();

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [song._id]);

  const defaultClass = 'bg-light-bg dark:bg-dark-bg w-full h-full';

  return (
    <div className={classNames(defaultClass, className)}>
      <audio ref={audioRef} controls hidden />
      <div className='grid h-full w-full grid-rows-4'>
        <div className='row-span-3 flex flex-nowrap'>
          <div className='dark:bg-dark-bg-light bg-light-bg-light m-2 flex basis-1/5 items-center justify-center'>
            <span className='material-symbols-outlined'>music_note</span>
          </div>
          <div className='grid basis-4/5 grid-cols-4'>
            <div className='col-span-3 p-2'>
              <div className=''>
                <h4 className='font-semibold text-nowrap'>
                  {song.originalname.substring(0, 30) + '...'}
                </h4>
              </div>
              <div>
                <p className='text-sm font-light'>Artist</p>
              </div>
            </div>
            <div
              className='bg-light-bg-light dark:bg-dark-bg-light m-2 flex items-center justify-center hover:cursor-pointer'
              onClick={togglePlay}
            >
              <span className='material-symbols-outlined'>
                {' '}
                {isPlaying ? 'pause' : 'play_arrow'}{' '}
              </span>
            </div>
            <div className='col-span-4 overflow-hidden p-2'>
              <div
                id='seekbar'
                className='bg-light-bg-light dark:bg-dark-bg-light h-2 w-full hover:cursor-pointer'
                onClick={handleSeek}
              >
                <div
                  id='progress'
                  className='bg-light-text-muted dark:bg-dark-highlight h-full'
                  style={{ width: `${songProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-4'>
          <div className='hover:bg-light-bg-light hover:dark:bg-dark-bg-light flex items-center justify-center hover:cursor-pointer'>
            <span className='material-symbols-outlined'> info </span>
          </div>
          <div
            className='hover:bg-light-bg-light hover:dark:bg-dark-bg-light flex items-center justify-center hover:cursor-pointer'
            onClick={handleDownload}
          >
            <span className='material-symbols-outlined'> download </span>
          </div>
          <div
            className='hover:bg-light-bg-light hover:dark:bg-dark-bg-light flex items-center justify-center hover:cursor-pointer'
            onClick={handleDelete}
          >
            <span className='material-symbols-outlined'> delete </span>
          </div>
          <div
            className='hover:bg-light-bg-light hover:dark:bg-dark-bg-light flex items-center justify-center hover:cursor-pointer'
            onClick={handleClose}
          >
            <span className='material-symbols-outlined'> close </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
