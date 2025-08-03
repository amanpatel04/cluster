import classNames from 'classnames';

import Card from './Card';

function SmartPopover({ children, className, isOpen, ...rest }) {
  const defaultClassName = 'absolute -bottom-full right-0';

  console.log(children);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={classNames(className, defaultClassName)} {...rest}>
      <Card>{children}</Card>
    </div>
  );
}

export default SmartPopover;
