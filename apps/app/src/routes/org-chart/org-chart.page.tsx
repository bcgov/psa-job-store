import { Col, Layout, Radio, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { DepartmentFilter } from './components/department-filter.component';
import { OrgChart } from './components/org-chart';
import { OrgChartHelpButton } from './components/org-chart-help-button.component';
import { TreeChartSearchProvider } from './components/tree-org-chart/tree-org-chart-search-context';
import { TreeOrgChartSearch } from './components/tree-org-chart/tree-org-chart-search.component';
import TreeOrgChart from './components/tree-org-chart/tree-org-chart.component';
import ViewToggle from './components/view-toggle';
import { OrgChartContext } from './enums/org-chart-context.enum';
import { OrgChartType } from './enums/org-chart-type.enum';

const { Content } = Layout;

export const OrgChartPage = () => {
  const [departmentId, setDepartmentId] = useState<string | null | undefined>(undefined);
  const [currentView, setCurrentView] = useState<'chart' | 'tree'>('chart');
  const [horizontal, setHorizontal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const { data: profileData, isFetching: profileDataIsFetching } = useGetProfileQuery();

  useEffect(() => {}, [profileDataIsFetching]);

  useEffect(() => {
    setDepartmentId(profileData?.profile.department_id);
  }, [profileData?.profile.department_id]);

  //  SEARCH

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <Content style={{ backgroundColor: '#FFF', display: 'flex', flex: '1 0 auto', flexDirection: 'column' }}>
      <TreeChartSearchProvider>
        <PageHeader
          title="My organizations"
          subTitle="You are viewing the current organization structure for your base work area. To begin,  click the supervisor of the new position you would like to create."
          extra={<OrgChartHelpButton />}
          subHeader={
            <Row gutter={16} align="middle" justify="space-between" style={{ paddingBottom: '10px' }}>
              <Col>
                <ViewToggle
                  view={currentView}
                  onToggle={(view) => {
                    setCurrentView(view);
                  }}
                />
              </Col>
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
          }
        />
        <Row justify="center" style={{ backgroundColor: '#F0F2F5', flex: 'auto' }}>
          <Col style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <div style={{ display: currentView !== 'chart' ? 'none' : 'block', height: '100%' }}>
              <OrgChart
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
                <TreeOrgChart
                  departmentIdIsLoading={profileDataIsFetching}
                  departmentId={departmentId ?? ''}
                  isHorizontal={horizontal}
                  searchTerm={searchTerm}
                />
              )
              // 022-2801
            }
          </Col>
        </Row>
      </TreeChartSearchProvider>
    </Content>
  );
};
