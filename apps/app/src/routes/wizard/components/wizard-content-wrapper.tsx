import React, { ReactNode } from 'react';

interface WizardContentWrapperProps {
  children: ReactNode;
}

const WizardContentWrapper: React.FC<WizardContentWrapperProps> = ({ children }) => {
  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        background: '#f5f5f5',
        marginLeft: '-1rem',
        marginRight: '-1rem',
        marginTop: '-1px',
        padding: '0 1rem',
        flex: '1',
      }}
    >
      {children}
    </div>
  );
};

export default WizardContentWrapper;
