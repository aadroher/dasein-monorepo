import React from 'react';

export interface PageHeaderProps {
  /** Page title text */
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return <h2 className="text-2xl font-bold text-neutral-50 mb-6">{title}</h2>;
};
