import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import Dashboard from './page/dashboard/Dashboard.jsx';
import Image from './page/image/Image.jsx';
import Audio from './page/audio/Audio.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/image" element={<Image />} />
                    <Route path="/audio" element={<Audio />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
