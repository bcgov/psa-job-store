import { Button, Card, Col, Divider, Radio, Row, Space, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import PositionProfile from '../../components/app/common/components/positionProfile';
import ContentWrapper from '../../components/content-wrapper.component';
import { useGetPositionRequestsCountQuery } from '../../redux/services/graphql-api/position-request.api';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import MyPositionsTable from '../my-position-requests/components/my-position-requests-table.component';
import { DepartmentFilter } from '../org-chart/components/department-filter.component';
import { OrgChart } from '../org-chart/components/org-chart';
import { OrgChartHelpButton } from '../org-chart/components/org-chart-help-button.component';
import { TreeChartSearchProvider } from '../org-chart/components/tree-org-chart/tree-org-chart-search-context';
import { TreeOrgChartSearch } from '../org-chart/components/tree-org-chart/tree-org-chart-search.component';
import TreeOrgChart from '../org-chart/components/tree-org-chart/tree-org-chart.component';
import { OrgChartContext } from '../org-chart/enums/org-chart-context.enum';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import HeaderWrapper from './components/header-wrapper.component';
import { InitialsAvatar } from './components/initials-avatar.component';
import './home.page.css';

const { Text } = Typography;

export const HomePage = () => {
  const auth = useAuth();
  const { data: positionsCountData } = useGetPositionRequestsCountQuery();
  const { total = 0, completed = 0, verification = 0 } = positionsCountData?.positionRequestsCount || {};
  const { data: profileData, isFetching: profileDataIsFetching } = useGetProfileQuery();
  const [currentView] = useState<'chart' | 'tree'>('chart');
  const [horizontal, setHorizontal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [departmentId, setDepartmentId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setDepartmentId(profileData?.profile.department_id);
  }, [profileData?.profile]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <TreeChartSearchProvider>
      <ReactFlowProvider>
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
                  <Text>My Position Requests</Text>
                  <br></br>
                  <Text strong style={{ fontSize: '140%', float: 'right' }} data-testid="total-positions">
                    {total}
                  </Text>
                </div>
                <div>
                  <Text>In Review</Text>
                  <br></br>
                  <Text strong style={{ fontSize: '140%', float: 'right' }} data-testid="in-review-positions">
                    {verification}
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
              <Link to="/requests/positions">
                <Button type="link" style={{ padding: '0' }}>
                  View all positions
                </Button>
              </Link>
            }
          ></MyPositionsTable>
          {/* Todo: pull in from actual user data */}

          <Card
            loading={profileDataIsFetching}
            className="orgChartCard"
            style={{
              height: '500px',
              overflow: 'hidden',
              background: 'none',
              border: '1px solid #D9D9D9',
              marginTop: '1rem',
              marginBottom: '2rem',
            }}
            bodyStyle={{
              padding: 0,
              height: '444px', // card height - header height

              display: 'flex',
              flexDirection: 'column',
            }}
            title={
              <Row align="bottom">
                <Col>
                  <h2 style={{ marginBottom: 0 }}>My organization</h2>{' '}
                </Col>
                {/* <Col style={{ paddingLeft: '20px', paddingBottom: '4px' }}>
                  <ViewToggle
                    size={'small'}
                    view={currentView}
                    onToggle={(view) => {
                      setCurrentView(view);
                    }}
                  />
                </Col> */}
              </Row>
            }
            extra={
              <Space direction="horizontal">
                <Link to="/org-chart">
                  <Button type="link" style={{ padding: '0' }}>
                    View all organizations
                  </Button>
                </Link>
                <OrgChartHelpButton />
              </Space>
            }
          >
            {/* <div className="sr-only" style={{ display: currentView !== 'chart' ? 'none' : 'block' }} tabIndex={0}>
              This chart view is not keyboard accessible. Please switch to the tree view for a keyboard-navigable
              version.
            </div> */}
            <div
              style={{ display: currentView !== 'chart' ? 'none' : 'block', height: '100%' }}
              aria-hidden={true}
              // tabIndex={-1}
            >
              <OrgChart
                data-testid="org-chart"
                type={OrgChartType.DYNAMIC}
                context={OrgChartContext.DEFAULT}
                setDepartmentId={setDepartmentId}
                departmentId={departmentId}
                departmentIdIsLoading={profileDataIsFetching}
                targetId={profileData?.profile.position_id}
                wrapProvider={false}
              />
            </div>
            {
              currentView !== 'chart' && (
                <>
                  <Row
                    gutter={16}
                    align="middle"
                    justify="space-between"
                    style={{ paddingBottom: '10px', paddingTop: '10px', margin: '0' }}
                  >
                    <Col flex="500px">
                      {currentView === 'tree' && (
                        <TreeOrgChartSearch
                          setSearchTerm={setSearchTerm}
                          onSearch={handleSearch}
                          disabled={departmentId == null || profileDataIsFetching}
                          searchTerm={searchTerm}
                        />
                      )}
                    </Col>
                    <Col>
                      {currentView === 'tree' && (
                        <Radio.Group value={horizontal} onChange={(e) => setHorizontal(e.target.value)}>
                          <Radio.Button value={true}>Horizontal</Radio.Button>
                          <Radio.Button value={false}>Vertical</Radio.Button>
                        </Radio.Group>
                      )}
                    </Col>
                    <Col flex="auto"> {/* This empty column will create the gap */}</Col>
                    <Col flex="500px">
                      {currentView === 'tree' && (
                        <DepartmentFilter
                          setDepartmentId={setDepartmentId}
                          departmentId={departmentId}
                          loading={profileDataIsFetching}
                        />
                      )}
                    </Col>
                  </Row>
                  <TreeOrgChart
                    source="home"
                    departmentIdIsLoading={profileDataIsFetching}
                    departmentId={departmentId ?? ''}
                    isHorizontal={horizontal}
                    searchTerm={searchTerm}
                  />
                </>
              )
              // 022-2801
            }
          </Card>
        </ContentWrapper>
      </ReactFlowProvider>
    </TreeChartSearchProvider>
  );
};
