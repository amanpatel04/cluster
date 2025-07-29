import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const AudioList = () => {
  const [audioList, setAudioList] = useState([]);

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
            console.log(data);
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
    <div>
      <div>
        {audioList.map((audio) => {
          return (
            <Link
              to={`/api/v1/audio/get/${audio}`}
              key={audio}
              className='card flex h-20 items-center justify-between'
            >
              <div>{audio}</div>
              <span className='material-symbols-outlined'> play_arrow </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AudioList;
