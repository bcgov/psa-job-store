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
  orgChartSnapshot?: OrgChartData;
  highlightPositionId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraNodeInfo?: any;
}

const OrgChartWrapped: React.FC<OrgChartRendererProps> = ({
  selectedDepartment,
  onCreateNewPosition,
  highlightPositionId,
  orgChartSnapshot = null,
  extraNodeInfo,
}) => {
  const [orgChart, setOrgChart] = useState<OrgChartData>(orgChartSnapshot ?? DEFAULT_ORG_CHART);
  const [trigger, { data, isFetching }] = useLazyGetOrgChartQuery();

  // console.log('selectedDepartment: ', selectedDepartment);

  useEffect(() => {
    if (selectedDepartment != null && !orgChartSnapshot) {
      // Fetch org chart data based on department if no snapshot
      setOrgChart(DEFAULT_ORG_CHART);
      trigger(selectedDepartment);
    }
  }, [selectedDepartment, trigger, orgChartSnapshot]);

  useEffect(() => {
    // console.log('org chart data: ', data);
    if (!orgChartSnapshot) {
      const objData: OrgChartData = data != null ? JSON.parse(JSON.stringify(data.orgChart)) : DEFAULT_ORG_CHART;
      setOrgChart(objData);
    }
  }, [data, orgChartSnapshot]);

  return isFetching ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Spin size="large" />
    </div>
  ) : orgChart.edges.length > 0 ? (
    <OrgChart
      disableCreateNewPosition={orgChartSnapshot != null}
      edges={orgChart.edges}
      nodes={orgChart.nodes}
      selectedDepartment={selectedDepartment}
      onCreateNewPosition={onCreateNewPosition}
      highlightPositionId={highlightPositionId}
      extraNodeInfo={extraNodeInfo}
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
