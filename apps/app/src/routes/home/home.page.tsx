import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import MyPositionsTable from '../my-positions/components/my-positions-table.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import ContentWrapper from './components/content-wrapper.component';
import HeaderWrapper from './components/header-wrapper.component';
import './home.page.css';

const { Title, Text } = Typography;

export const HomePage = () => {
  const auth = useAuth();

  return (
    <>
      <HeaderWrapper>
        <Row justify="space-between" align="bottom">
          <Col>
            <Space direction="vertical">
              <Title level={4}>Hello,</Title>
              <Space align="center">
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                  <Title level={4}>{auth.user?.profile.name}</Title>
                  <Text type="secondary">HR Manager · Digital Talent & Capacity</Text>
                </div>
              </Space>
            </Space>
          </Col>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <div>
                <Text>My Positions</Text>
                <br></br>
                <Text strong style={{ fontSize: '140%', float: 'right' }}>
                  12
                </Text>
              </div>
              <div>
                <Text>In Review</Text>
                <br></br>
                <Text strong style={{ fontSize: '140%', float: 'right' }}>
                  6
                </Text>
              </div>
              <div>
                <Text>Completed</Text>
                <br></br>
                <Text strong style={{ fontSize: '140%', float: 'right' }}>
                  4
                </Text>
              </div>
            </Space>
          </Col>
        </Row>
      </HeaderWrapper>
      <ContentWrapper>
        <MyPositionsTable
          style={{ paddingTop: '1rem' }}
          allowSorting={false}
          showPagination={false}
          showFooter={false}
          itemsPerPage={5}
          topRightComponent={
            <Link to="/my-positions">
              <Button type="link" style={{ padding: '0' }}>
                View all positions
              </Button>
            </Link>
          }
        ></MyPositionsTable>
        {/* Todo: pull in from actual user data */}

        <Card
          className="orgChartCart"
          style={{
            height: '500px',
            overflow: 'hidden',
            background: 'none',
            border: '1px solid #D9D9D9',
            marginTop: '1rem',
          }}
          title="My Recent Positions"
          extra={
            <Link to="/org-chart">
              <Button type="link" style={{ padding: '0' }}>
                View all organizations
              </Button>
            </Link>
          }
        >
          <OrgChartWrapped selectedDepartment="112-0074" />
        </Card>
      </ContentWrapper>
    </>
  );
};
