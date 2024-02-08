import { useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
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

  const { data: profileData } = useGetProfileQuery();

  // if wizard context has department info (e.g. if user is editing a position request), use that as the default
  // otherwise, use the user's department from their profile
  useEffect(() => {
    if (profileData?.profile.department_id != null && !selectedDepartment) {
      setSelectedDepartment(profileData.profile.department_id);
    }
  }, [profileData, selectedDepartment]);

  // console.log('positionRequestDepartmentId from wizard org chart page: ', positionRequestDepartmentId);
  return (
    <WizardPageWrapper
      title="New position"
      subTitle="Here you are able to create a position. Start by clicking the supervisor of the position you would like to create."
    >
      <WizardSteps current={0}></WizardSteps>
      <OrgChartFilter
        setSelectedDepartment={setSelectedDepartment}
        selectedDepartment={selectedDepartment}
        defaultValue={positionRequestDepartmentId}
      />
      <div style={{ overflow: 'hidden', position: 'relative', height: '500px' }}>
        <OrgChartWrapped selectedDepartment={selectedDepartment} onCreateNewPosition={onCreateNewPosition} />
      </div>
    </WizardPageWrapper>
  );
};
