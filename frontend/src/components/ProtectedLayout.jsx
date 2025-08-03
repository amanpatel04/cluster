import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Upload from './Upload';

const ProtectedLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <Upload />
        <main className='min-w-72 p-2'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
