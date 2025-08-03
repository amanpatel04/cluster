import { useState, useEffect } from 'react';

import Card from './ui/Card';
import AudioPlayer from './AudioPlayer';
const AudioList = () => {
  const [audioList, setAudioList] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isPlayingList, setIsPlayingList] = useState(false);

  const setSong = (idx) => {
    if (idx === index) {
      setIndex(-1);
    } else {
      setIndex(idx);
    }
  };

  const nextSong = () => {
    if (index + 1 < audioList.length) {
      setIndex(index + 1);
    }
  };

  const removeFromList = (id) => {
    setAudioList(audioList.filter((audio) => audio._id !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/audio/get', {
      method: 'GET',
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            setAudioList(data.data);
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

  if (audioList.length === 0) {
    return <div className='text-center'>No audios</div>;
  }

  return (
    <div className='mx-auto grid grid-cols-1 gap-2 md:w-2/3 lg:w-1/2'>
      {audioList.map((audio, idx) => {
        return (
          <div key={audio._id}>
            <Card>
              <div className='flex'>
                <div className='flex basis-2/12 items-center justify-center'>
                  <span className='material-symbols-outlined'>
                    {' '}
                    audiotrack{' '}
                  </span>
                </div>
                <div className='grid basis-8/12 grid-rows-3 items-center overflow-hidden'>
                  <h4 className='row-span-2 px-2 text-nowrap'>
                    {audio.originalname.substring(0, 30) + '...'}
                  </h4>
                  <p className='px-2 text-sm font-extralight text-nowrap'>
                    Artist
                  </p>
                </div>
                <div
                  className='hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex basis-2/12 items-center justify-center hover:cursor-pointer'
                  onClick={() => setSong(idx)}
                >
                  <span className='material-symbols-outlined'>
                    {isPlayingList && index === idx ? 'pause' : 'play_arrow'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
      {index !== -1 && (
        <div className='fixed right-1 bottom-0 left-1 h-40 overflow-hidden'>
          <Card className={'mx-auto h-full w-full rounded md:w-2/3 lg:w-1/2'}>
            <AudioPlayer
              song={audioList[index]}
              setIndex={setIndex}
              setIsPlayingList={setIsPlayingList}
              nextSong={nextSong}
              removeFromList={removeFromList}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default AudioList;
