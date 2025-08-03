import classNames from 'classnames';

const IconButton = (icon, name, onClick = () => {}, className, ...rest) => {
  const defaultClassName =
    'hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex h-10 items-center pl-3';
  return (
    <li
      className={classNames(className, defaultClassName)}
      onClick={onClick}
      {...rest}
    >
      {icon}
      <span className='flex h-full w-full items-center pl-2 text-lg font-light'>
        {name}
      </span>
    </li>
  );
};

export default IconButton;
