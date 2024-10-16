import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
  padTop?: boolean;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, padTop = true, ...props }) => {
  return (
    <div
      {...props}
      style={{
        padding: padTop ? '1rem' : '0 1rem 1rem 1rem',
        backgroundColor: '#f5f5f5',
        display: 'flex', // Set the display to flex
        flexDirection: 'column', // Stack children vertically
      }}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
