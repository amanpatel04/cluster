import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/Sidebar/sidebar';

const Header = () => {
  const dispatch = useDispatch();
  const sidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className='dark:text-dark-text flex h-15 w-full'>
      <div
        className='dark:bg-dark-bg-light bg-light-bg flex aspect-square flex-none items-center justify-center hover:cursor-pointer'
        onClick={sidebarToggle}
      >
        <span className='material-symbols-outlined'>arrow_menu_open</span>
      </div>
      <div className='flex w-full items-center justify-center'>
        <input
          className='border-light-border text-light-text dark:border-dark-border dark:text-dark-text h-10 rounded border border-b px-2 text-base font-light focus:outline-0 md:w-8/12 lg:w-6/12'
          type='text'
          name='search'
          id='search'
          placeholder='Search ...'
        />
      </div>
    </div>
  );
};

export default Header;
