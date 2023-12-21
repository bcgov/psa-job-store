import { PageHeader } from '@ant-design/pro-layout';
import { useState } from 'react';
import 'reactflow/dist/style.css';
import { OrgChartFilter } from './components/org-chart-filter.component';
import OrgChartWrapped from './components/org-chart-wrapped.component';

export const OrgChartPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  return (
    <>
      <PageHeader title="Org Chart" />
      <OrgChartFilter setSelectedDepartment={setSelectedDepartment} />
      <OrgChartWrapped selectedDepartment={selectedDepartment} />
    </>
  );
};
