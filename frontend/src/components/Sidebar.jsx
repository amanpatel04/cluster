import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/Sidebar/sidebar';

import IconListItem from './ui/IconListItem';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  useEffect(() => {
    // if (isOpen) {
    //   document.body.classList.add('overflow-hidden');
    // } else {
    //   document.body.classList.remove('overflow-hidden');
    // }
    // return () => {
    //   document.body.classList.remove('overflow-hidden');
    // };
  }, [isOpen]);

  const closeSidebar = (event) => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`bg-dark-bg-dark/10 dark:bg-light-bg-dark/10 fixed h-screen w-screen ${isOpen ? 'right-0' : 'right-full'
        } fixed z-10 transition-[right] duration-500 ease-out`}
      onClick={closeSidebar}
    >
      <div className='from-light-bg-dark to-light-bg dark:from-dark-bg-dark dark:to-dark-bg dark:text-dark-text flex h-full w-2/3 max-w-80 flex-col justify-between overflow-y-auto bg-gradient-to-r'>
        <header className='flex h-20 flex-none items-center justify-center'>
          <h4 className='font-mono text-xl font-semibold'>FILEORCA</h4>
        </header>

        <main className='flex-auto'>
          <hr className='h-line' />
          <ul>
            <IconListItem
              icon={
                <span className='material-symbols-outlined'>dashboard</span>
              }
              name={'Dashboard'}
              href={'/'}
            />
            <IconListItem
              icon={<span className='material-symbols-outlined'>image</span>}
              name={'Gallery'}
              href={'/gallery'}
            />

            <IconListItem
              icon={
                <span className='material-symbols-outlined'>video_file</span>
              }
              name={'Video'}
              href={'/video'}
            />

            <IconListItem
              icon={
                <span className='material-symbols-outlined'>audio_file</span>
              }
              name={'Audio'}
              href={'/audio'}
            />
            <IconListItem
              icon={
                <span className='material-symbols-outlined'>file_open</span>
              }
              name={'Files'}
              href={'/file'}
            />
          </ul>
        </main>
        <footer className='flex-none pb-3'>
          <hr className='h-line' />
          <ul>
            <IconListItem
              icon={
                <span className='material-symbols-outlined'>
                  feedback
                </span>
              }
              name={'Feedback'}
              href={'/feedback'}
            />
            <IconListItem
              icon={<span className='material-symbols-outlined'>Logout</span>}
              name={'Logout'}
              href={'/logout'}
            />
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
