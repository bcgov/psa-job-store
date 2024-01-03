import { Empty, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';

import { useLazyGetOrgChartQuery } from '../../../redux/services/graphql-api/org-chart.api';
import { OrgChart } from './org-chart.component';

type OrgChartData = { edges: Edge[]; nodes: Node[] };
const DEFAULT_ORG_CHART: OrgChartData = { edges: [], nodes: [] };

interface OrgChartRendererProps {
  selectedDepartment: string | null;
  onCreateNewPosition?: () => void | null;
}

const OrgChartWrapped: React.FC<OrgChartRendererProps> = ({ selectedDepartment, onCreateNewPosition }) => {
  const [orgChart, setOrgChart] = useState<OrgChartData>(DEFAULT_ORG_CHART);
  const [trigger, { data, isFetching }] = useLazyGetOrgChartQuery();

  // console.log('selectedDepartment: ', selectedDepartment);

  useEffect(() => {
    setOrgChart(DEFAULT_ORG_CHART);
    if (selectedDepartment != null) {
      trigger(selectedDepartment);
    }
  }, [selectedDepartment, trigger]);

  useEffect(() => {
    // console.log('org chart data: ', data);
    const objData: OrgChartData = data != null ? JSON.parse(JSON.stringify(data.orgChart)) : DEFAULT_ORG_CHART;
    setOrgChart(objData);
  }, [data]);

  return isFetching ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Spin size="large" />
    </div>
  ) : orgChart.edges.length > 0 ? (
    <OrgChart
      edges={orgChart.edges}
      nodes={orgChart.nodes}
      selectedDepartment={selectedDepartment}
      onCreateNewPosition={onCreateNewPosition}
    />
  ) : (
    <Space style={{ height: '100%', width: '100%', justifyContent: 'center' }} align="center">
      <Empty
        description={
          selectedDepartment == null
            ? 'Select a department to get started'
            : 'No positions exist in the selected department'
        }
      />
    </Space>
  );
};

export default OrgChartWrapped;
