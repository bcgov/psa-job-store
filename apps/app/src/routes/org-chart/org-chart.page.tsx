import { PageHeader } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChartFilter } from './components/org-chart-filter.component';
import OrgChartWrapped from './components/org-chart-wrapped.component';

export const OrgChartPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const { data: profileData } = useGetProfileQuery();

  useEffect(() => {
    if (profileData?.profile.department_id != null) {
      setSelectedDepartment(profileData.profile.department_id);
    }
  }, [profileData]);

  return (
    <div style={{ height: '100%' }}>
      <PageHeader title="Org Chart" />
      <OrgChartFilter setSelectedDepartment={setSelectedDepartment} selectedDepartment={selectedDepartment} />
      <OrgChartWrapped selectedDepartment={selectedDepartment} />
    </div>
  );
};
