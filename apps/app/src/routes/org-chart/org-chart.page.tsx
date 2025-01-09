import { Button, Col, Layout, Row, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/app/page-header.component';
import { useTypedSelector } from '../../redux/redux.hooks';
import { OrgChart } from './components/org-chart';
import { OrgChartHelpButton } from './components/org-chart-help-button.component';
import { TreeChartSearchProvider } from './components/tree-org-chart/tree-org-chart-search-context';
import TreeOrgChart from './components/tree-org-chart/tree-org-chart.component';
import { OrgChartContext } from './enums/org-chart-context.enum';
import { OrgChartType } from './enums/org-chart-type.enum';

const { Content } = Layout;

export const OrgChartPage = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const [departmentId, setDepartmentId] = useState<string | null | undefined>(undefined);
  const [currentView] = useState<'chart' | 'tree'>('chart');
  const [horizontal] = useState(false);
  const [searchTerm] = useState<string | undefined>(undefined);

  useEffect(() => {
    setDepartmentId(auth.user?.metadata.peoplesoft.department_id);
  }, [auth.user]);

  //  SEARCH

  // const handleSearch = useCallback((value: string) => {
  //   setSearchTerm(value);
  // }, []);

  return (
    <Content
      style={{ backgroundColor: '#FFF', display: 'flex', flex: '1 0 auto', flexDirection: 'column', height: '100%' }}
    >
      <TreeChartSearchProvider>
        <PageHeader
          title="My departments"
          subTitle="You are viewing the current organization structure for your base work area. To begin, click the supervisor of the new position you would like to create."
          extra={
            <>
              <Tooltip
                trigger={['hover', 'click']}
                title="The position might be in a different department ID. Please check Peoplesoft for the latest org structure."
              >
                <Button
                  id="changes"
                  role="note"
                  type="link"
                  style={{ textDecoration: 'underline' }}
                  aria-label="Why can't I make changes? Because the position might be in a different department ID. Please check Peoplesoft for the latest org structure."
                >
                  Why can't I make changes?
                </Button>
              </Tooltip>
              <OrgChartHelpButton />
            </>
          }
          // subHeader={
          //   <Row gutter={16} align="middle" justify="space-between" style={{ paddingBottom: '10px' }}>
          //     <Col>
          //       <ViewToggle
          //         view={currentView}
          //         onToggle={(view) => {
          //           setCurrentView(view);
          //         }}
          //       />
          //     </Col>
          //     <Col flex="500px">
          //       {currentView === 'tree' && (
          //         <TreeOrgChartSearch
          //           setSearchTerm={setSearchTerm}
          //           onSearch={handleSearch}
          //           disabled={departmentId == null || profileDataIsFetching}
          //           searchTerm={searchTerm}
          //         />
          //       )}
          //     </Col>
          //     <Col>
          //       {currentView === 'tree' && (
          //         <Radio.Group value={horizontal} onChange={(e) => setHorizontal(e.target.value)}>
          //           <Radio.Button value={true}>Horizontal</Radio.Button>
          //           <Radio.Button value={false}>Vertical</Radio.Button>
          //         </Radio.Group>
          //       )}
          //     </Col>
          //     <Col flex="auto"> {/* This empty column will create the gap */}</Col>
          //     <Col flex="500px">
          //       {currentView === 'tree' && (
          //         <DepartmentFilter
          //           setDepartmentId={setDepartmentId}
          //           departmentId={departmentId}
          //           loading={profileDataIsFetching}
          //         />
          //       )}
          //     </Col>
          //   </Row>
          // }
        />
        <Row justify="center" style={{ backgroundColor: '#f5f5f5', flex: 'auto' }}>
          <Col style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <div style={{ display: currentView !== 'chart' ? 'none' : 'block', height: '100%' }}>
              <OrgChart
                type={OrgChartType.DYNAMIC}
                context={OrgChartContext.DEFAULT}
                setDepartmentId={setDepartmentId}
                departmentId={departmentId}
                targetId={auth.user?.metadata.peoplesoft.position_id}
                wrapProvider={false}
              />
            </div>
            {
              currentView !== 'chart' && (
                <TreeOrgChart departmentId={departmentId ?? ''} isHorizontal={horizontal} searchTerm={searchTerm} />
              )
              // 022-2801
            }
          </Col>
        </Row>
      </TreeChartSearchProvider>
    </Content>
  );
};
