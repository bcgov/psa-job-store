import { PageHeader } from '@ant-design/pro-layout';
import { Empty, Skeleton, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { useLazyGetOrgChartQuery } from '../../redux/services/graphql-api/org-chart.api';
import { OrgChartFilter } from './components/org-chart-filter.component';
import { OrgChart } from './components/org-chart.component';

type OrgChartData = { edges: Edge[]; nodes: Node[] };
const DEFAULT_ORG_CHART: OrgChartData = { edges: [], nodes: [] };

export const OrgChartPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [orgChart, setOrgChart] = useState<OrgChartData>(DEFAULT_ORG_CHART);

  const [trigger, { data, isFetching }] = useLazyGetOrgChartQuery();

  useEffect(() => {
    setOrgChart(DEFAULT_ORG_CHART);
    if (selectedDepartment != null) {
      trigger(selectedDepartment);
    }
  }, [selectedDepartment, trigger]);

  useEffect(() => {
    // The `data` object is immutable, so we stringify and parse `data.orgChart`
    // so reactflow can add properties
    const objData: OrgChartData = data != null ? JSON.parse(JSON.stringify(data.orgChart)) : DEFAULT_ORG_CHART;
    setOrgChart(objData);
  }, [data]);

  // TODO: Fetch org chat, setOrgChart
  const renderOrgChart = () => {
    const { edges, nodes } = orgChart;

    return isFetching ? (
      <Space style={{ height: '100%', width: '100%', justifyContent: 'center' }} align="center">
        <div>
          <Skeleton style={{ display: 'block', height: '100%', width: '100%' }} loading={isFetching} />
        </div>
      </Space>
    ) : edges.length > 0 ? (
      <OrgChart edges={edges} nodes={nodes} />
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

  return (
    <>
      <PageHeader title="Org Chart" />
      <OrgChartFilter setSelectedDepartment={setSelectedDepartment} />
      {renderOrgChart()}
    </>
  );
};
