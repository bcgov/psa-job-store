import { Button, Card, Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { useTypedSelector } from '../../../../../redux/redux.hooks';
import { OrgChart } from '../../../../org-chart/components/org-chart';
import { OrgChartHelpButton } from '../../../../org-chart/components/org-chart-help-button.component';
import { OrgChartContext } from '../../../../org-chart/enums/org-chart-context.enum';
import { OrgChartType } from '../../../../org-chart/enums/org-chart-type.enum';

export const OrgChartCard = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const [departmentId, setDepartmentId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setDepartmentId(auth.user?.metadata.peoplesoft.department_id);
  }, [auth.user]);

  return (
    <ReactFlowProvider>
      <Card
        className="orgChartCard"
        style={{
          height: '500px',
          background: 'none',
          border: '1px solid #DEDEDE',
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
          </Row>
        }
        extra={
          <Space direction="horizontal">
            <Link to="/my-departments">
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
          style={{ display: 'block', height: '100%' }}
          aria-hidden={true}
          // tabIndex={-1}
        >
          <OrgChart
            type={OrgChartType.DYNAMIC}
            context={OrgChartContext.DEFAULT}
            setDepartmentId={setDepartmentId}
            departmentId={departmentId}
            targetId={auth.user?.metadata.peoplesoft.position_id}
            wrapProvider={false}
          />
        </div>
      </Card>
    </ReactFlowProvider>
  );
};
