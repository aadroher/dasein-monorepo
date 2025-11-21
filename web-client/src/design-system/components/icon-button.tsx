import React from 'react';

export type IconButtonVariant = 'primary' | 'danger';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Heroicon component to render */
  icon: React.ComponentType<{
    className?: string;
    'aria-hidden'?: boolean;
  }>;

  /** Accessible label for screen readers (required) */
  label: string;

  /** Visual variant for styling */
  variant?: IconButtonVariant;
}

const variantClasses: Record<IconButtonVariant, string> = {
  primary:
    'text-primary-500 hover:bg-primary-900/20 focus-visible:ring-primary-400 active:bg-primary-900/30',
  danger:
    'text-red-500 hover:bg-red-900/20 focus-visible:ring-red-400 active:bg-red-900/30',
};

const baseClasses =
  'inline-flex items-center justify-center p-2 rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]';

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  variant = 'primary',
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled}
    >
      <Icon className="w-5 h-5" aria-hidden={true} />
    </button>
  );
};
