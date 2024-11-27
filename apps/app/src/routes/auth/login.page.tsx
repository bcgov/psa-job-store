import { LoginOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { useMatch } from 'react-router-dom';

export const LoginPage = () => {
  const { Title, Text, Link } = Typography;
  // const [searchParams] = useSearchParams();
  // const isLogoutPage = searchParams.get('logout') != null ? true : false;

  const isLoginPage = useMatch('/auth/login') != null;

  return (
    <Row justify="center" align="middle" style={{ height: '100%', justifyContent: 'center', background: '#f5f5f5' }}>
      <Col span={12}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Title style={{ fontSize: '2rem' }}>{isLoginPage ? 'Welcome to the Job Store' : 'Logged out'}</Title>
            <Text style={{ fontSize: '18px', lineHeight: '26px' }} type="secondary">
              {isLoginPage
                ? 'Please log in to access your Job Store account.'
                : 'You have successfully logged out of the Job Store.'}
            </Text>
          </div>
          <Card size="default" style={{ backgroundColor: '#FFF' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={5}>{isLoginPage ? 'Public Sector Employee' : 'A bit more to do?'}</Title>
              <Text>Use your IDIR to sign in to the Job Store.</Text>
              <Button
                icon={<LoginOutlined />}
                onClick={() => (window.location.href = 'http://localhost:4000/auth/login')}
                type="primary"
                style={{ marginTop: '0.5rem' }}
              >
                Log In Using IDIR
              </Button>
            </Space>
            <Divider />
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={5}>Need Help?</Title>
              <Text>Contact your IDIR security administrator or the 7-7000 Service Desk at:</Text>
              <Text>
                Phone:{' '}
                <Link href="tel://2503877000" target="_blank">
                  250-387-7700
                </Link>
              </Text>
              <Text>
                Email:{' '}
                <Link href="mailto://77000@gov.bc.ca" target="_blank">
                  77000@gov.bc.ca
                </Link>
              </Text>
            </Space>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};
