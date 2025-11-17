import React from 'react';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'subtle';
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<LinkProps['variant']>, string> = {
  default:
    'text-primary-500 hover:text-primary-600 underline hover:no-underline',
  subtle:
    'text-text-primary hover:text-primary-500 no-underline hover:underline',
};

const baseClasses =
  'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded-sm';

export const Link: React.FC<LinkProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};
