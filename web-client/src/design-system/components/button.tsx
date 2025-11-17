import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-surface hover:bg-primary-600 focus-visible:ring-primary-400 active:bg-primary-700',
  secondary:
    'bg-secondary-500 text-surface hover:bg-secondary-600 focus-visible:ring-secondary-400 active:bg-secondary-700',
  tertiary:
    'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

const baseClasses =
  'font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
