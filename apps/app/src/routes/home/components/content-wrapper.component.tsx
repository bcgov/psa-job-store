import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <div style={{ padding: '0 1rem', backgroundColor: '#F0F2F5', flex: 1, overflowY: 'auto' }}>{children}</div>;
};

export default ContentWrapper;
