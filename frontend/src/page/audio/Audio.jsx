import React, { useEffect, useRef, useState } from 'react';

import { useApiCall } from '../../utils/UseApiCall';
import makeDeleteRequest from '../../utils/delelteRequest';
import Sidebar from '../../components/Sidebar';
import { FaPlay } from 'react-icons/fa';
import { IoIosPause } from 'react-icons/io';
import { MdOutlineDelete } from 'react-icons/md';

const Audio = () => {
  const [audios, setAudios] = useState([]);
  const [isPlaying, setIsPlaying] = useState(-1);
  const audioPlayer = useRef(null);
  useEffect(() => {
    async function getAudios() {
      const response = await useApiCall('/audio/get', true);
      if (response != null) {
        setAudios(response.data);
      }
    }
    getAudios();
  }, []);

  const handlePlay = (index) => {
    const player = audioPlayer.current;
    if (isPlaying !== index) {
      setIsPlaying(index);
      player.src = audios[index].path.substr(7);
      player.play();
    } else {
      player.pause();
      setIsPlaying(-1);
    }
  };

  const handleDelete = async (id) => {
    const response = await makeDeleteRequest('/audio/delete/' + id, true);
    if (response !== null) {
      window.location.reload();
    }
  };

  const audioList = audios.map((audio, index) => {
    return (
      <div
        className="audio flex flex-row h-14 border-b border-green-500"
        key={index}
      >
        <div className="flex-1 flex items-center px-1 font-norma text-green-500 border-r border-green-500 relative">
          {audio.filename.length > 35
            ? audio.filename.substr(0, 35) + '...'
            : audio.filename}
          <div
            className="w-10 h-10 bg-red-500 absolute bottom-2 right-2 text-2xl flex justify-center items-center rounded-full hover:cursor-pointer"
            onClick={() => handleDelete(audio._id)}
          >
            <MdOutlineDelete className="text-white" />
          </div>
        </div>

        <div
          className="flex-none flex justify-center items-center hover:cursor-pointer aspect-square text-green-500"
          onClick={() => handlePlay(index)}
        >
          {index === isPlaying ? (
            <IoIosPause className="text-2xl" />
          ) : (
            <FaPlay className="text-2xl" />
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="m-2 md:m-5">
        <div className="grid gap-1 grid-cols-1 md:w-3/5 mx-auto">
          {audioList}
        </div>
        <div>
          <audio ref={audioPlayer} className="hidden" />
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Audio;
