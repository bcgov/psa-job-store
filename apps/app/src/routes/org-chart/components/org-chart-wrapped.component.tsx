import { Empty, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';

import { useLazyGetOrgChartQuery } from '../../../redux/services/graphql-api/org-chart.api';
import { OrgChart } from './org-chart.component';

type OrgChartData = { edges: Edge[]; nodes: Node[] };
const DEFAULT_ORG_CHART: OrgChartData = { edges: [], nodes: [] };

interface OrgChartRendererProps {
  selectedDepartment: string | null;
}

const OrgChartWrapped: React.FC<OrgChartRendererProps> = ({ selectedDepartment }) => {
  const [orgChart, setOrgChart] = useState<OrgChartData>(DEFAULT_ORG_CHART);
  const [trigger, { data, isFetching }] = useLazyGetOrgChartQuery();

  useEffect(() => {
    setOrgChart(DEFAULT_ORG_CHART);
    if (selectedDepartment != null) {
      trigger(selectedDepartment);
    }
  }, [selectedDepartment, trigger]);

  useEffect(() => {
    const objData: OrgChartData = data != null ? JSON.parse(JSON.stringify(data.orgChart)) : DEFAULT_ORG_CHART;
    setOrgChart(objData);
  }, [data]);

  console.log('isFetching: ', isFetching);
  return isFetching ? (
    <Space style={{ height: '100%', width: '100%', justifyContent: 'center' }} align="center">
      <Skeleton style={{ display: 'block', height: '100%', width: '100%' }} loading={isFetching} />
    </Space>
  ) : orgChart.edges.length > 0 ? (
    <OrgChart edges={orgChart.edges} nodes={orgChart.nodes} />
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
