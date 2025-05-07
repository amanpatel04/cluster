import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

import Dashboard from './page/dashboard/Dashboard.jsx';
import Image from './page/image/Image.jsx';
import Audio from './page/audio/Audio.jsx';
import Video from './page/video/Video.jsx';
import Other from './page/other/Other.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/image" element={<Image />} />
                    <Route path="/audio" element={<Audio />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/video/:id" element={<VideoPlayer />} />
                    <Route path="/other" element={<Other />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
