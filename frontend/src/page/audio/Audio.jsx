import React, { useEffect, useRef, useState } from 'react';

import makeGetRequest from '../../utils/getRequest';
import Sidebar from '../../components/Sidebar';
import { FaPlay } from 'react-icons/fa';
import { IoIosPause } from 'react-icons/io';

const Audio = () => {
    const [audios, setAudios] = useState([]);
    const [isPlaying, setIsPlaying] = useState(-1);
    const audioPlayer = useRef(null);
    useEffect(() => {
        async function getAudios() {
            const response = await makeGetRequest('/audio/get', true);
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
            player.src = 'http://localhost:8000/' + audios[index].path.substr(7);
            player.play();
        } else {
            player.pause();
            setIsPlaying(-1);
        }
    };

    const audioList = audios.map((audio, index) => {
        return (
            <div
                className="audio flex flex-row gap-3 h-14 border border-white"
                key={index}
            >
                <div className="flex-1 flex items-center px-4 font-medium text-xl">
                    {(audio.filename.length > 60) ? audio.filename.substr(0, 60) + '...' : audio.filename}
                </div>
                <div
                    className="flex-none flex justify-center items-center hover:cursor-pointer aspect-square border-l border-white"
                    onClick={() => handlePlay(index)}
                >
                    {(index === isPlaying) ? (
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
            <div className="container relative left-12 top-24 px-24">
                <div className="grid gap-1">{audioList}</div>
                <div>
                    <audio 
                        ref={audioPlayer}
                        className='hidden'
                    />
                </div>
            </div>
            <Sidebar />
        </>
    );
};

export default Audio;
