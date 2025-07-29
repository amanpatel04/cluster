import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setLoading } from './features/auth/auth';

import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import VideoTimeline from './components/VideoTimeline';
import AudioList from './components/AudioList';
import Files from './components/Files';
import ProtectedLayout from './components/ProtectedLayout';

import ProtectedRoute from './features/ProtectedRoute';
import AuthRoute from './features/AuthRoute';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    const abort = new AbortController();
    fetch('/api/v1/user/isLoggedIn', {
      method: 'GET',
      credentials: 'include',
      signal: abort.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(login());
          dispatch(setLoading(false));
        } else {
          fetch('/api/v1/user/renew', {
            method: 'GET',
            credentials: 'include',
            signal: abort.signal,
          }).then((res) => {
            res.json().then((data) => {
              if (data.success) {
                dispatch(login());
              } else {
                dispatch(logout());
              }
              console.log('renew token', data);
              dispatch(setLoading(false));
            });
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log('App.jsx rendered');
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
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<ProtectedLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/video' element={<VideoTimeline />} />
            <Route path='/audio' element={<AudioList />} />
            <Route path='/file' element={<Files />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
