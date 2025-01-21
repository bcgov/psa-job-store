import { LoginOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useState } from 'react';

const { Text, Title } = Typography;

export const BCeIDLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={5}>Agencies, Boards & Commissions</Title>
      <Text>
        Use your{' '}
        <a href="https://www.bceid.ca/" referrerPolicy="no-referrer" target="_blank">
          BCeID
        </a>{' '}
        to sign in to the Job Store.
      </Text>
      <Button
        onClick={() => {
          setIsLoading(true);
          window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/login/bceid`;
        }}
        icon={<LoginOutlined />}
        loading={isLoading}
        style={{ marginTop: '0.5rem' }}
        type="default"
      >
        Log In Using BCeID
      </Button>
    </Space>
  );
};
