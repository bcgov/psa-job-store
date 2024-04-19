import { Col, Row, Space, Spin } from 'antd';
import { autolayout } from 'common-kit';
import Fuse from 'fuse.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeProps,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  useReactFlow,
} from 'reactflow';
import { useDebounce } from 'usehooks-ts';
import { useLazyGetOrgChartQuery } from '../../../../redux/services/graphql-api/org-chart.api';
import { initialElements } from '../../constants/initial-elements.constant';
import { OrgChartContext } from '../../enums/org-chart-context.enum';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { Elements } from '../../interfaces/elements.interface';
import { getFocusedElements } from '../../utils/get-focused-elements.util';
import { DepartmentFilter } from '../department-filter.component';
import { OrgChartNode } from '../org-chart-node.component';
import { PositionSearch } from '../position-search.component';

interface BaseDynamicOrgChartProps {
  type: OrgChartType.DYNAMIC;
  setDepartmentId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  departmentId: string | null | undefined;
  departmentIdIsLoading?: boolean;
  targetId?: string | undefined;
}

export interface DefaultContextDynamicOrgChartProps {
  context: OrgChartContext.DEFAULT;
}

export interface WizardContextDynamicOrgChartProps {
  context: OrgChartContext.WIZARD;
  onSelectedNodeIdsChange: (ids: string[], elements: Elements) => void;
}

export type DynamicOrgChartProps = (DefaultContextDynamicOrgChartProps | WizardContextDynamicOrgChartProps) &
  BaseDynamicOrgChartProps;

export const DynamicOrgChart = ({
  type,
  setDepartmentId,
  departmentId,
  departmentIdIsLoading,
  targetId,
  ...props
}: DynamicOrgChartProps) => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const debouncedElements = useDebounce(elements, 500);
  const [getOrgChart, { currentData: orgChartData, isFetching: orgChartDataIsFetching }] = useLazyGetOrgChartQuery();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const { fitView } = useReactFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const getSearchResults = useCallback(() => nodes.filter((node) => node.data.isSearchResult === true), [nodes]);

  useEffect(() => {
    setIsDirty(false);
    setSearchTerm(undefined);

    if (departmentId == null) {
      setElements(initialElements);
      getOrgChart('', false);
    } else {
      getOrgChart(departmentId, false);
    }
  }, [departmentId]);

  useEffect(() => {
    if (orgChartData?.orgChart != null) {
      const elements = autolayout(orgChartData?.orgChart);
      setElements(JSON.parse(JSON.stringify(elements)));
    }
  }, [orgChartData?.orgChart]);

  const search = useCallback(
    (searchTerm: string | undefined) => {
      if (searchTerm == null) return [];

      // For the ID search, don't include positions where position_status === 'PROPOSED'
      const approvedPositionNodes = debouncedElements.nodes.filter((node) => node.data.position_status === 'Approved');
      const idSearch = new Fuse(approvedPositionNodes, {
        keys: ['id'],
        includeMatches: true,
        includeScore: true,
        threshold: 0,
      });

      const stringSearch = new Fuse(debouncedElements.nodes, {
        keys: ['data.title', 'data.employees.name'],
        includeMatches: true,
        includeScore: true,
        threshold: 0.25,
      });

      const idResults = idSearch.search(searchTerm);
      const stringResults = stringSearch.search(searchTerm);

      return [...idResults.map((r) => r.item), ...stringResults.map((r) => r.item)].flatMap((node) => node.id);
    },
    [debouncedElements.nodes],
  );

  useEffect(() => {
    if (type === OrgChartType.DYNAMIC && props.context === OrgChartContext.WIZARD) {
      props.onSelectedNodeIdsChange(selectedNodeIds, { edges, nodes });
    }
  }, [props.context, edges, nodes, selectedNodeIds]);

  useEffect(() => {
    const { edges, nodes } = JSON.parse(JSON.stringify(debouncedElements));
    if (searchTerm && searchTerm.length > 0 && selectedNodeIds.length > 0) setSelectedNodeIds([]);
    if (
      isDirty === false &&
      targetId &&
      targetId.length > 0 &&
      nodes.filter((node: Node) => node.id === targetId).length > 0 &&
      !selectedNodeIds.includes(targetId)
    )
      setSelectedNodeIds([targetId]);

    if (selectedNodeIds.length > 0) {
      const focusedElements = [
        ...getFocusedElements(
          nodes.filter((node: Node) => selectedNodeIds.includes(node.id)),
          debouncedElements,
          true,
        ),
        ...getFocusedElements(
          nodes.filter((node: Node) => selectedNodeIds.includes(node.id)),
          debouncedElements,
          false,
        ),
      ];
      const focusedElementIds = focusedElements.flatMap((el) => el.id);

      edges.forEach((edge: Edge) => {
        edge.animated = focusedElementIds.includes(edge.id);
        edge.selected = focusedElementIds.includes(edge.id);
        edge.style = {
          ...edge.style,
          stroke: focusedElementIds.includes(edge.id) ? 'blue' : '#B1B1B1',
        };
      });
      nodes.forEach((node: Node) => {
        node.data = {
          ...node.data,
          isAdjacent: focusedElementIds.includes(node.id),
          isSearchResult: false,
        };
        node.selected = selectedNodeIds.includes(node.id);
        node.style = {
          ...node.style,
          opacity:
            selectedNodeIds.length > 0
              ? selectedNodeIds.includes(node.id) || focusedElementIds.includes(node.id)
                ? 1
                : 0.25
              : 1,
        };
      });
    } else if (searchTerm && searchTerm.length > 0 && selectedNodeIds.length === 0) {
      const searchResultIds = search(searchTerm);

      edges.forEach((edge: Edge) => {
        edge.animated = false;
        edge.selected = false;
        edge.style = {
          ...edge.style,
          stroke: '#B1B1B1',
        };
      });

      nodes.forEach((node: Node) => {
        node.data = {
          ...node.data,
          isAdjacent: false,
          isSearchResult: searchResultIds.includes(node.id),
        };
        node.selected = false;
        node.style = {
          ...node.style,
          opacity: 1,
        };
      });
    }

    setEdges(edges);
    setNodes(nodes);
  }, [debouncedElements, searchTerm, selectedNodeIds]);

  useEffect(() => {
    const searchResultNodes = nodes.filter((node) => node.data.isSearchResult === true);
    const selectedNodes = nodes.filter((node) => node.selected === true);
    const adjacentNodes = selectedNodes.length > 0 ? nodes.filter((node) => node.data.isAdjacent === true) : [];

    if (selectedNodes.length > 0) {
      fitView({ duration: 800, nodes: [...selectedNodes, ...adjacentNodes] });
    } else if (searchResultNodes.length > 0) {
      fitView({ duration: 800, nodes: searchResultNodes });
    } else {
      if (isDirty === false) {
        fitView({ duration: 800, nodes });
      }
    }
  }, [nodes]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length > 0) {
        setIsDirty(true);
        setSearchTerm(undefined);
      }

      setSelectedNodeIds(nodes.flatMap((node) => node.id));
    },
  });

  const nodeTypes = useMemo(() => {
    return {
      'org-chart-card': ({ ...nodeProps }: NodeProps) => (
        <OrgChartNode {...nodeProps} orgChartType={type} orgChartContext={props.context} isConnectable={false} />
      ),
    };
  }, [props.context, type]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Row gutter={[8, 8]} justify="space-between" style={{ margin: '0.5rem 1rem' }}>
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
              searchResults={getSearchResults()}
              searchTerm={searchTerm}
            />
          </Space>
        </Col>
      </Row>
      {orgChartDataIsFetching ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <Spin spinning style={{ margin: 'auto' }} />
        </div>
      ) : (
        <ReactFlow
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onPaneClick={() => {
            setIsDirty(true);
            setSearchTerm(undefined);
          }}
          edges={edges}
          elevateEdgesOnSelect
          minZoom={0.1}
          nodeTypes={nodeTypes}
          nodes={nodes}
          nodesConnectable={false}
          nodesDraggable={false}
        >
          <Background />
          <Controls position="top-right" />
          <MiniMap
            nodeStrokeWidth={3}
            pannable
            style={{ border: '1px solid #B1B1B1', height: 100, width: 150 }}
            zoomable
          />
        </ReactFlow>
      )}
    </div>
  );
};
