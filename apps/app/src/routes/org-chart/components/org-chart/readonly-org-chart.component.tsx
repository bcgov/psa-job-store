import { Col, Row, Space, Spin, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import ReactFlow, { Background, MiniMap, Node, NodeProps, useEdgesState, useNodesState } from 'reactflow';
import { useGetDepartmentQuery } from '../../../../redux/services/graphql-api/department.api';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { Elements } from '../../interfaces/elements.interface';
import { Controls } from '../controls';
import { OrgChartNode } from '../org-chart-node.component';

const { Text } = Typography;

export interface ReadonlyOrgChartProps {
  type: OrgChartType.READONLY;
  departmentId: string;
  elements: Elements;
}

export const ReadonlyOrgChart = ({ elements, departmentId, type }: ReadonlyOrgChartProps) => {
  const { data: departmentData, isFetching: departmentDataIsFetching } = useGetDepartmentQuery(departmentId);

  const [edges, setEdges] = useEdgesState([]);
  const [nodes, setNodes] = useNodesState([]);

  useEffect(() => {
    const { edges, nodes } = JSON.parse(JSON.stringify(elements));

    nodes.forEach((node: Node) => {
      node.selectable = false;
    });

    setEdges(edges);
    setNodes(nodes);
  }, [elements]);

  const nodeTypes = useMemo(() => {
    return {
      'org-chart-card': ({ ...nodeProps }: NodeProps) => (
        <OrgChartNode {...nodeProps} isConnectable={false} orgChartData={{ edges, nodes }} orgChartType={type} />
      ),
    };
  }, [edges, nodes, type]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Row gutter={[8, 8]} justify="space-between" style={{ margin: '0.5rem 1rem' }}>
        <Col xs={24} md={{ offset: 12, span: 12 }}>
          <Space direction="vertical" style={{ textAlign: 'right', width: '100%' }}>
            {departmentDataIsFetching ? (
              <Spin spinning />
            ) : (
              <>
                <Space>
                  <Text strong>Department:</Text>
                  <div>
                    <Text>{departmentData?.department.name}</Text>{' '}
                    <Text type="secondary">({departmentData?.department.id})</Text>
                  </div>
                </Space>
              </>
            )}
          </Space>
        </Col>
      </Row>
      <ReactFlow
        edges={edges}
        fitView
        minZoom={0}
        nodeTypes={nodeTypes}
        nodes={nodes}
        nodesConnectable={false}
        nodesDraggable={false}
        edgesFocusable={false}
        edgesUpdatable={false}
        onEdgeClick={() => {}}
        onNodeClick={() => {}}
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
    </div>
  );
};
