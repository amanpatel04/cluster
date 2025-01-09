import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Upload from "./components/Upload.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
                <Sidebar />
            </BrowserRouter>
        </>
    );
}

export default App;
