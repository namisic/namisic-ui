import React from 'react';

export interface PageTitleProps {
  title?: string;
}

const PageTitle: React.FunctionComponent<PageTitleProps> = ({ title }) => {
  if (title === undefined) return null;
  return <h1 className="text-xl font-bold mb-4 mt-0 font-sans">{title}</h1>;
};

export default PageTitle;
