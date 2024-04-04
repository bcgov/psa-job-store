import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import PositionProfile from '../../components/app/common/components/positionProfile';
import { useGetPositionRequestsCountQuery } from '../../redux/services/graphql-api/position-request.api';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import MyPositionsTable from '../my-positions/components/my-positions-table.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import ContentWrapper from './components/content-wrapper.component';
import HeaderWrapper from './components/header-wrapper.component';
import { InitialsAvatar } from './components/initials-avatar.component';
import './home.page.css';

const { Text } = Typography;

export const HomePage = () => {
  const auth = useAuth();
  const { data: positionsCountData } = useGetPositionRequestsCountQuery();
  const { total = 0, completed = 0, inReview = 0 } = positionsCountData?.positionRequestsCount || {};
  const { data: profileData, isLoading: profileIsLoading } = useGetProfileQuery();

  return (
    <>
      <HeaderWrapper>
        <Row justify="space-between" align="bottom">
          <Col>
            <Space direction="vertical">
              <Space align="center">
                <InitialsAvatar name={auth.user?.profile.given_name + ' ' + auth.user?.profile.family_name} />
                {/* <Avatar size={64} icon={<UserOutlined />} /> */}
                <div>
                  <Text
                    style={{
                      fontSize: '20px',
                      lineHeight: 1.4,
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {auth.user?.profile.name}
                  </Text>
                  <div style={{ height: '19px' }}>
                    <PositionProfile
                      positionNumber={profileData?.profile.position_id}
                      // positionNumber={'00121521'}
                      mode="compact2"
                      unOccupiedText=""
                      loadingStyle={'skeleton'}
                    />
                  </div>
                  {/* <Text type="secondary">HR Manager · Digital Talent & Capacity</Text> */}
                </div>
              </Space>
            </Space>
          </Col>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <div>
                <Text>My Positions</Text>
                <br></br>
                <Text strong style={{ fontSize: '140%', float: 'right' }} data-testid="total-positions">
                  {total}
                </Text>
              </div>
              <div>
                <Text>In Review</Text>
                <br></br>
                <Text strong style={{ fontSize: '140%', float: 'right' }} data-testid="in-review-positions">
                  {inReview}
                </Text>
              </div>
              <div>
                <Text>Completed</Text>
                <br></br>
                <Text strong style={{ fontSize: '140%', float: 'right' }} data-testid="completed-positions">
                  {completed}
                </Text>
              </div>
            </Space>
          </Col>
        </Row>
      </HeaderWrapper>
      <ContentWrapper>
        <MyPositionsTable
          data-testid="recent-positions"
          style={{ paddingTop: '1rem' }}
          allowSorting={false}
          showPagination={false}
          showFooter={false}
          itemsPerPage={5}
          tableTitle="My recent positions"
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
          loading={profileIsLoading}
          className="orgChartCart"
          style={{
            height: '500px',
            overflow: 'hidden',
            background: 'none',
            border: '1px solid #D9D9D9',
            marginTop: '1rem',
          }}
          title={<h2 style={{ marginBottom: 0 }}>My organization</h2>}
          extra={
            <Link to="/org-chart">
              <Button type="link" style={{ padding: '0' }}>
                View all organizations
              </Button>
            </Link>
          }
        >
          <OrgChartWrapped
            data-testid="org-chart"
            selectedDepartment={profileData?.profile.department_id ?? null}
            profileHasNoDepartment={profileData?.profile.department_id === null ? true : false}
          />
        </Card>
      </ContentWrapper>
    </>
  );
};
