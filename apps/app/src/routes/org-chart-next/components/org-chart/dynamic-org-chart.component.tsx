import { Col, Row, Space, Tag } from 'antd';
import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useState } from 'react';
import { Node, useOnSelectionChange } from 'reactflow';
import { useLazyGetOrgChartQuery } from '../../../../redux/services/graphql-api/org-chart.api';
import { initialElements } from '../../constants/initial-elements.constant';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { Elements } from '../../interfaces/elements.interface';
import { autolayout } from '../../utils/autolayout.util';
import { styleElements } from '../../utils/style-elements.util';
import { DepartmentFilter } from '../department-filter.component';
import { PositionSearch } from '../position-search.component';
import { OrgChartImpl } from './org-chart-impl.component';

export interface DynamicOrgChartProps {
  type: OrgChartType.DYNAMIC;
  setDepartmentId: React.Dispatch<React.SetStateAction<string | undefined>>;
  departmentId: string | undefined;
  departmentIdIsLoading?: boolean;
}

export const DynamicOrgChart = ({ setDepartmentId, departmentId, departmentIdIsLoading }: DynamicOrgChartProps) => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const [getOrgChart, { currentData: orgChartData, isFetching: orgChartDataIsFetching }] = useLazyGetOrgChartQuery();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [searchResultNodes, setSearchResultNodes] = useState<Node[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  const fuse = useMemo(
    () =>
      new Fuse(elements.nodes, {
        keys: ['id', 'data.title', 'data.employees.name'],
        includeMatches: true,
        includeScore: true,
        threshold: 0.25,
      }),
    [elements.nodes],
  );

  useEffect(() => {
    setIsDirty(false);
    if (departmentId == null) {
      setElements(initialElements);
      getOrgChart('', false);
    } else {
      getOrgChart(departmentId, false);
    }
  }, [departmentId]);

  useEffect(() => {
    if (isDirty === false) {
      setSearchTerm(undefined);
      setSearchResultNodes([]);
    }
  }, [isDirty]);

  useEffect(() => {
    console.log('orgChatData?.orgChart: ', orgChartData);

    if (orgChartData?.orgChart != null) {
      setIsDirty(false);

      const { edges, nodes } = autolayout(orgChartData?.orgChart);
      setElements({ edges: [...edges], nodes: [...nodes] });
    }
  }, [orgChartData?.orgChart]);

  useEffect(() => {
    const results = searchTerm != null ? fuse.search(searchTerm) : [];
    setSearchResultNodes(results.map((result) => result.item));
  }, [searchTerm]);

  useEffect(() => {
    if ((searchResultNodes ?? []).length > 0 || (searchTerm ?? '').length > 0) {
      setIsDirty(true);
    }

    const { edges, nodes } = styleElements(elements, searchResultNodes, selectedNodes, searchTerm);
    setElements({ edges, nodes });
  }, [searchResultNodes, selectedNodes, searchTerm]);

  useOnSelectionChange({
    onChange: ({ nodes: changedNodes }) => {
      if (changedNodes.length > 0) {
        setIsDirty(true);
        setSearchTerm(undefined);
        setSearchResultNodes([]);
      }

      console.log('changedNodes ', changedNodes);
      setSelectedNodes(changedNodes);
    },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Row gutter={[8, 8]} justify="space-between" style={{ margin: '0.5rem 1rem' }}>
        <Col span={24}>
          <Tag>Filters</Tag>
          <Tag color={isDirty ? 'red' : 'green'}>Is Dirty?: {isDirty === true ? 'true' : 'false'}</Tag>
          <Tag color="green">Department ID: {departmentId ?? ''}</Tag>
          <Tag color="green">Search Term: {searchTerm ?? ''}</Tag>
          <Tag color="green">Search Results: {searchResultNodes?.length}</Tag>
        </Col>
        <Col xs={24} md={{ offset: 12, span: 12 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <DepartmentFilter
              setDepartmentId={setDepartmentId}
              departmentId={departmentId}
              loading={departmentIdIsLoading}
            />
            <PositionSearch
              setSearchTerm={setSearchTerm}
              disabled={departmentId == null || departmentIdIsLoading}
              searchResults={searchResultNodes}
              searchTerm={searchTerm}
            />
          </Space>
        </Col>
      </Row>
      <OrgChartImpl
        onPaneClick={() => {
          setIsDirty(true);
          setSearchTerm(undefined);
        }}
        setIsDirty={setIsDirty}
        elements={elements}
        isDirty={isDirty}
        loading={orgChartDataIsFetching}
      />
    </div>
  );
};
