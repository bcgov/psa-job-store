import { useState } from 'react';
import 'reactflow/dist/style.css';
import { OrgChartFilter } from '../org-chart/components/org-chart-filter.component';
import OrgChartWrapped from '../org-chart/components/org-chart-wrapped.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';

export const WizardOrgChartPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>('112-0074');

  return (
    <WizardPageWrapper title="New position" subTitle="Select a supervisor">
      <WizardSteps current={0}></WizardSteps>
      <OrgChartFilter setSelectedDepartment={setSelectedDepartment} />
      <div style={{ overflow: 'hidden', position: 'relative', height: '500px' }}>
        <OrgChartWrapped selectedDepartment={selectedDepartment} />
      </div>
    </WizardPageWrapper>
  );
};
