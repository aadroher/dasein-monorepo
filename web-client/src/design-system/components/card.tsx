import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

const elevationClasses: Record<NonNullable<CardProps['elevation']>, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

const baseClasses = 'bg-surface rounded-lg border border-neutral-200';

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  elevation = 'md',
  className = '',
  ...props
}) => {
  const classes = [baseClasses, elevationClasses[elevation], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {header && (
        <div className="px-6 py-4 border-b border-neutral-200">{header}</div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-neutral-200">{footer}</div>
      )}
    </div>
  );
};
