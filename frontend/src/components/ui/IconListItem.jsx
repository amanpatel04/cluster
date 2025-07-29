import { Link } from 'react-router-dom';

const IconListItem = (props) => {
  return (
    <Link to={props.href}>
      <li className='hover:bg-light-bg-light dark:hover:bg-dark-bg-light flex h-10 items-center pl-3'>
        {props.icon}
        <span className='flex h-full w-full items-center pl-2 text-lg font-light'>
          {props.name}
        </span>
      </li>
    </Link>
  );
};

export default IconListItem;
