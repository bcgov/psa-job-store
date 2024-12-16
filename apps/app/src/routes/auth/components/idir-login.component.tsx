import { LoginOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useState } from 'react';

const { Text, Title } = Typography;

export const IDIRLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={5}>Public Sector Employee</Title>
      <Text>Use your IDIR to sign in to the Job Store.</Text>
      <Button
        onClick={() => {
          setIsLoading(true);
          window.location.href = 'http://localhost:4000/auth/login';
        }}
        icon={<LoginOutlined />}
        loading={isLoading}
        style={{ marginTop: '0.5rem' }}
        type="primary"
      >
        Log In Using IDIR
      </Button>
    </Space>
  );
};
