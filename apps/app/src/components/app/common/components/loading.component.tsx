import { Spin } from 'antd';
import { FC } from 'react';

interface LoadingProps {
  loadingText?: string;
  mode?: 'normal' | 'small'; // Mode parameter
}

const LoadingComponent: FC<LoadingProps> = ({ loadingText, mode = 'normal' }) => {
  if (mode === 'small') {
    return <Spin size="small" />;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" />
      {loadingText && <span style={{ marginLeft: '0.5rem' }}>{loadingText}</span>}
    </div>
  );
};

export default LoadingComponent;
