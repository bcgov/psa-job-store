import React from 'react';

interface HeaderWrapperProps {
  children: React.ReactNode;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
  return <div style={{ padding: '1rem' }}>{children}</div>;
};

export default HeaderWrapper;
