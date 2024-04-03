import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        padding: '0 1rem',
        backgroundColor: '#F0F2F5',
        display: 'flex', // Set the display to flex
        flexDirection: 'column', // Stack children vertically
        height: '100%', // Take full height of the parent
      }}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
