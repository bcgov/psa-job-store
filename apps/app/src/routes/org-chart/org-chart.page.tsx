import { Col, Layout, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChart } from './components/org-chart';
import { OrgChartHelpButton } from './components/org-chart-help-button.component';
import TreeOrgChart from './components/tree-org-chart/tree-org-chart.component';
import ViewToggle from './components/view-toggle';
import { OrgChartContext } from './enums/org-chart-context.enum';
import { OrgChartType } from './enums/org-chart-type.enum';

const { Content } = Layout;

export const OrgChartPage = () => {
  const [departmentId, setDepartmentId] = useState<string | null | undefined>(undefined);
  const [currentView, setCurrentView] = useState<'chart' | 'tree'>('tree');
  const [horizontal, setHorizontal] = useState(false);
  const { data: profileData, isFetching: profileDataIsFetching } = useGetProfileQuery();

  useEffect(() => {
    console.log('profileDataIsFetching: ', profileDataIsFetching);
  }, [profileDataIsFetching]);

  useEffect(() => {
    setDepartmentId(profileData?.profile.department_id);
  }, [profileData?.profile.department_id]);

  return (
    <Content style={{ backgroundColor: '#FFF', display: 'flex', flex: '1 0 auto', flexDirection: 'column' }}>
      <PageHeader
        title="My organizations"
        subTitle="You are viewing the current organization structure for your base work area. To begin,  click the supervisor of the new position you would like to create."
        extra={<OrgChartHelpButton />}
        subHeader={
          <>
            <ViewToggle
              view={currentView}
              onToggle={(view) => {
                setCurrentView(view);
              }}
            />
            {currentView == 'tree' && (
              <div style={{ marginLeft: '10px', display: 'inline' }}>
                <Radio.Group value={horizontal} onChange={(e) => setHorizontal(e.target.value)}>
                  <Radio.Button value={true}>Horizontal</Radio.Button>
                  <Radio.Button value={false}>Vertical</Radio.Button>
                </Radio.Group>
              </div>
            )}
          </>
        }
      />
      <Row justify="center" style={{ backgroundColor: '#F0F2F5', flex: 'auto' }}>
        <Col style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <ReactFlowProvider>
            <div style={{ display: currentView !== 'chart' ? 'none' : 'block' }}>
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
              currentView !== 'chart' && <TreeOrgChart departmentId="022-2825" isHorizontal={horizontal} />
              // 022-2801
            }
          </ReactFlowProvider>
        </Col>
      </Row>
    </Content>
  );
};
