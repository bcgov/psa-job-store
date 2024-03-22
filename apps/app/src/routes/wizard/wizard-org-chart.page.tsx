/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'reactflow/dist/style.css';
import { usePosition } from '../../components/app/common/contexts/position.context';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChartFilter } from '../org-chart/components/org-chart-filter.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

interface WizardOrgChartPageProps {
  onCreateNewPosition?: () => void;
}

export const WizardOrgChartPage = ({ onCreateNewPosition }: WizardOrgChartPageProps) => {
  const { positionRequestDepartmentId } = useWizardContext();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(positionRequestDepartmentId);
  const [isLoading, setIsLoading] = useState(false);

  const { data: profileData } = useGetProfileQuery();

  // if wizard context has department info (e.g. if user is editing a position request), use that as the default
  // otherwise, use the user's department from their profile
  useEffect(() => {
    if (profileData?.profile.department_id != null && !selectedDepartment) {
      setSelectedDepartment(profileData.profile.department_id);
    }
  }, [profileData, selectedDepartment]);

  const navigate = useNavigate();

  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const orgChartJsonRef = useRef(null);
  const onNodeSelected = (node: any) => {
    setSelectedNode(node);
  };

  const { createNewPosition } = usePosition();
  const next = async () => {
    if (selectedDepartment == null) return;
    setIsLoading(true);
    try {
      await createNewPosition(selectedNode.id, selectedDepartment, orgChartJsonRef.current);
      onCreateNewPosition?.();
    } finally {
      setIsLoading(false);
    }
  };

  const onOrgChartLoad = (orgChartData: any) => {
    // console.log('setting orgchart json: ', orgChartData);
    // console.log('A:', JSON.stringify(orgChartData));
    // console.log('B:', JSON.stringify(orgChartJson));
    orgChartJsonRef.current = orgChartData;
  };

  // state for selected node

  // console.log('positionRequestDepartmentId from wizard org chart page: ', positionRequestDepartmentId);
  return (
    <WizardPageWrapper
      title={
        <div>
          <Link to="/">
            <ArrowLeftOutlined style={{ color: 'black', marginRight: '1rem' }} />
          </Link>
          New position
        </div>
      }
      subTitle="Here you are able to create a position. Start by clicking the supervisor of the position you would like to create."
      hpad={false}
      additionalBreadcrumb={{ title: 'New position' }}
      grayBg={false}
      pageHeaderExtra={[
        <Button onClick={() => navigate('/')}>Cancel</Button>,
        <Button type="primary" disabled={selectedNode == null} onClick={next} loading={isLoading}>
          Next
        </Button>,
      ]}
    >
      <WizardSteps current={0}></WizardSteps>
      <OrgChartFilter
        setSelectedDepartment={setSelectedDepartment}
        selectedDepartment={selectedDepartment}
        defaultValue={positionRequestDepartmentId}
      />
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          background: 'rgb(240, 242, 245)',
          marginLeft: '-1rem',
          marginRight: '-1rem',
          marginTop: '-1px',
        }}
      >
        <OrgChartWrapped
          selectedDepartment={selectedDepartment}
          onCreateNewPosition={onCreateNewPosition}
          allowSelection={true}
          onNodeSelected={onNodeSelected}
          onOrgChartLoad={onOrgChartLoad}
        />
      </div>
    </WizardPageWrapper>
  );
};
