import classNames from 'classnames';

const Card = ({ children, className, ...rest }) => {
  const defaultClassName =
    'from-light-bg to-light-bg-dark hover:from-light-bg-light border-t-light-highlight shadow-light-text-muted dark:from-dark-bg dark:to-dark-bg-dark dark:border-dark-border dark:hover:from-dark-bg-light bg-gradient-to-b shadow dark:border dark:shadow-none';

  return (
    <div className={classNames(className, defaultClassName)} {...rest}>
      {children}
    </div>
  );
};

export default Card;
