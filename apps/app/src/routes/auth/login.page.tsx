import { Card, Col, Divider, Row, Space, Typography } from 'antd';
import { IDIRLogin } from './components/idir-login.component';

export const LoginPage = () => {
  const { Title, Text, Link } = Typography;

  return (
    <Row justify="center" align="middle" style={{ height: '100%', justifyContent: 'center', background: '#f5f5f5' }}>
      <Col span={12}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Title style={{ fontSize: '2rem' }}>Welcome to the Job Store</Title>
            <Text style={{ fontSize: '18px', lineHeight: '26px' }} type="secondary">
              Please log in to access your Job Store account.
            </Text>
          </div>
          <Card size="default" style={{ backgroundColor: '#FFF' }}>
            <IDIRLogin />
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
