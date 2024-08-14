// OrgChartVisualization.tsx
import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Edge, MiniMap, Node, NodeTypes, useReactFlow } from 'reactflow';
import { PositionProvider } from '../../../../components/app/common/contexts/position.context';
import { Controls } from '../controls';
import DownloadButton from './download-button.component';
import OrgChartTreeView from './org-chart-tree-view.component';

interface OrgChartFlowProps {
  edges: Edge[];
  nodes: Node[];
  nodeTypes: NodeTypes;
  onPaneClick: () => void;
  departmentId: string;
  wizardNextHandler?: (options?: { switchStep?: boolean }) => Promise<string | undefined>;
  searchTerm?: string;
  loading?: boolean;
  treeViewInFocusCallback: (inFocus: boolean) => void;
}

const OrgChartFlow: React.FC<OrgChartFlowProps> = ({
  edges,
  nodes,
  nodeTypes,
  onPaneClick,
  departmentId,
  wizardNextHandler,
  searchTerm,
  loading,
  treeViewInFocusCallback,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { setCenter } = useReactFlow();

  useEffect(() => {
    if (selectedNodeId) {
      // console.log('selectedNodeId: ', selectedNodeId);
      const node = nodes.find((n) => n.id === selectedNodeId);
      // console.log('node: ', node);
      if (node) {
        setCenter(node.position.x + (node.width ?? 0) / 2, node.position.y + (node.height ?? 0) / 2, {
          zoom: 1.5,
          duration: 1000,
        });
      }
    }
  }, [selectedNodeId, nodes, setCenter]);

  return (
    <>
      <PositionProvider>
        <div style={{ height: '0px', overflow: 'auto' }}>
          <OrgChartTreeView
            data={{ nodes: nodes, edges: edges }}
            departmentId={departmentId}
            setSelectedNodeId={setSelectedNodeId}
            wizardNextHandler={wizardNextHandler}
            searchTerm={searchTerm}
            loading={loading}
            treeViewInFocusCallback={treeViewInFocusCallback}
          />
        </div>
        <ReactFlow
          aria-hidden="true"
          onPaneClick={() => {
            setSelectedNodeId(null);
            onPaneClick();
          }}
          edges={edges}
          elevateEdgesOnSelect
          minZoom={0}
          nodeTypes={nodeTypes}
          nodes={nodes}
          nodesConnectable={false}
          nodesDraggable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          disableKeyboardA11y={true}
          // selectedNodes={selectedNodeId ? [selectedNodeId] : []}
        >
          <Background />
          <Controls position="top-right" focusable={false} />
          <MiniMap
            nodeStrokeWidth={3}
            pannable
            style={{ border: '1px solid #B1B1B1', height: 100, width: 150 }}
            zoomable
          />
          <DownloadButton focusable={false} />
        </ReactFlow>
      </PositionProvider>
    </>
  );
};

export default OrgChartFlow;
