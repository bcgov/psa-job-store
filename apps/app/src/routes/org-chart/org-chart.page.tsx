import { useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import { PageHeader } from '../../components/app/page-header.component';
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
    <div style={{ height: 'calc(100% - 110px)' }}>
      <PageHeader
        title="My organizations"
        subTitle="You are viewing the current organization structure for your base work area. To begin,  click the supervisor of the new position you would like to create."
      />
      <OrgChartFilter
        setSelectedDepartment={setSelectedDepartment}
        selectedDepartment={selectedDepartment}
        defaultValue={null}
      />
      <OrgChartWrapped selectedDepartment={selectedDepartment} />
    </div>
  );
};
