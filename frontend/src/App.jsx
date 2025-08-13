import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading } from './features/auth/auth';
import apiGateway from './utils/apiGateway';

import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import Verify from './components/Verify';
import Logout from './components/Logout';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import VideoTimeline from './components/VideoTimeline';
import VideoPlayer from './components/VideoPlayer';
import AudioList from './components/AudioList';
import Files from './components/Files';
import Feedback from "./components/Feedback";
import ProtectedLayout from './components/ProtectedLayout';

import ProtectedRoute from './features/ProtectedRoute';
import AuthRoute from './features/AuthRoute';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(setLoading(true));
    const abort = new AbortController();
    apiGateway('/api/v1/user/isLoggedIn/', 'GET', undefined, abort)
      .then((data) => {
        if (data.success) {
          dispatch(login());
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error.message);
      })

    return () => {
      abort.abort();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/resetpass' element={<ForgetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<ProtectedLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/video' element={<VideoTimeline />} />
            <Route path='/video/:id' element={<VideoPlayer />} />
            <Route path='/audio' element={<AudioList />} />
            <Route path='/file' element={<Files />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Route>
        <Route path='/verify' element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
