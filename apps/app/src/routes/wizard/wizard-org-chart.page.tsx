import { useState } from 'react';
import 'reactflow/dist/style.css';
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

  console.log('positionRequestDepartmentId from wizard org chart page: ', positionRequestDepartmentId);
  return (
    <WizardPageWrapper title="New position" subTitle="Select a supervisor">
      <WizardSteps current={0}></WizardSteps>
      <OrgChartFilter setSelectedDepartment={setSelectedDepartment} defaultValue={positionRequestDepartmentId} />
      <div style={{ overflow: 'hidden', position: 'relative', height: '500px' }}>
        <OrgChartWrapped selectedDepartment={selectedDepartment} onCreateNewPosition={onCreateNewPosition} />
      </div>
    </WizardPageWrapper>
  );
};
