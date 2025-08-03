import classNames from 'classnames'; // Utility to merge class names conditionally

/**
 * Reusable Button component.
 *
 * Supports different visual styles (variants), click handling,
 * and can be extended with custom className and other props.
 */
function Button({
  children,
  variant = 'primary',
  onClick = () => {},
  className,
  ...rest
}) {
  // Base styles common to all buttons
  const baseStyle =
    'px-4 py-2 font-semibold cursor-pointer flex items-center justify-center';

  // Variant-specific styles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary:
      'text-light-text hover:bg-gray-400/50 bg-light-bg-light/20 dark:bg-dark-bg-light/20 dark:hover:bg-dark-highlight dark:text-dark-text',
    outline: 'border border-gray-500 text-black hover:bg-gray-100',
  };

  return (
    <button
      // Merge base styles, variant styles, and any additional className from parent
      className={classNames(baseStyle, variants[variant], className)}
      onClick={onClick}
      {...rest} // Spread remaining props (like type, disabled, etc.)
    >
      {children}
      {/* Render button content passed between <Button>... </Button> */}
    </button>
  );
}

export default Button;
