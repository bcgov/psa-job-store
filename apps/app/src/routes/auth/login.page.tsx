import { Button, Space } from 'antd';
import { useAuth } from 'react-oidc-context';

export const LoginPage = () => {
  const auth = useAuth();

  return (
    <Space align="center" direction="vertical" style={{ height: '100vh', width: '100vw', justifyContent: 'center' }}>
      <Button onClick={() => auth.signinRedirect()} type="primary">
        Log In
      </Button>
    </Space>
  );
};
