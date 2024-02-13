/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dagre from '@dagrejs/dagre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  MiniMap,
  Node,
  isNode,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { OrgChartCard } from './org-chart-card.component';

interface Props {
  edges: Edge[];
  nodes: Node[];
  selectedDepartment: string | null;
  onCreateNewPosition?: () => void | null;
  disableCreateNewPosition?: boolean;
  highlightPositionId?: string;
  extraNodeInfo?: any;
  allowSelection?: boolean;
  onNodeSelected?: (node: any) => void;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 200;

const getLayoutedElements = (nodes: any, edges: any, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: any) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const OrgChart = ({
  edges: initialEdges,
  nodes: initialNodes,
  selectedDepartment,
  onCreateNewPosition,
  highlightPositionId,
  disableCreateNewPosition = false,
  allowSelection = false, // will mark the card as selected if true instead of showing the popover
  extraNodeInfo,
  onNodeSelected,
}: Props) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  // const [nodes] = useState(layoutedNodes);
  // const [edges] = useState(layoutedEdges);
  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState<any>();

  // callback on selectedNode

  useEffect(() => {
    onNodeSelected && onNodeSelected(selectedNode);
  }, [selectedNode, onNodeSelected]);

  const getIncomers = useCallback((node: Node | Connection | Edge, nodes: any[], edges: any[]) => {
    if (!isNode(node)) {
      return [];
    }

    const incomersIds = edges
      .filter((e: { target: string }) => e.target === node.id)
      .map((e: { source: any }) => e.source);

    return nodes.filter((e: { id: any }) =>
      incomersIds
        .map((id: string) => {
          const matches = /([\w-^]+)__([\w-]+)/.exec(id);
          if (matches === null) {
            return id;
          }
          return matches[1];
        })
        .includes(e.id),
    );
  }, []);

  const getAllIncomers = useCallback(
    (node: any, nodes: any, edges: any, prevIncomers: any = []) => {
      const incomers = getIncomers(node, nodes, edges);
      const result = incomers.reduce((memo: any[], incomer: { id: any }) => {
        memo.push(incomer);

        if (prevIncomers.findIndex((n: any) => n.id == incomer.id) == -1) {
          prevIncomers.push(incomer);

          getAllIncomers(incomer, nodes, edges, prevIncomers).forEach((foundNode: { id: any }) => {
            memo.push(foundNode);

            if (prevIncomers.findIndex((n: any) => n.id == foundNode.id) == -1) {
              prevIncomers.push(incomer);
            }
          });
        }
        return memo;
      }, []);
      return result;
    },
    [getIncomers],
  );

  const getOutgoers = useCallback((node: Node | Connection | Edge, nodes: any[], edges: any[]) => {
    if (!isNode(node)) {
      return [];
    }

    const outgoerIds = edges
      .filter((e: { source: string }) => e.source === node.id)
      .map((e: { target: any }) => e.target);

    return nodes.filter((n: { id: any }) =>
      outgoerIds
        .map((id: string) => {
          const matches = /([\w-^]+)__([\w-]+)/.exec(id);
          if (matches === null) {
            return id;
          }
          return matches[1];
        })
        .includes(n.id),
    );
  }, []);

  const getAllOutgoers = useCallback(
    (node: any, nodes: any, edges: any, prevOutgoers: any = []) => {
      const outgoers = getOutgoers(node, nodes, edges);
      return outgoers.reduce((memo: any[], outgoer: { id: any }) => {
        memo.push(outgoer);

        if (prevOutgoers.findIndex((n: any) => n.id == outgoer.id) == -1) {
          prevOutgoers.push(outgoer);

          getAllOutgoers(outgoer, nodes, edges, prevOutgoers).forEach((foundNode: { id: any }) => {
            memo.push(foundNode);

            if (prevOutgoers.findIndex((n: any) => n.id == foundNode.id) == -1) {
              prevOutgoers.push(foundNode);
            }
          });
        }
        return memo;
      }, []);
    },
    [getOutgoers],
  );

  const [incomerIds, setIncomerIds] = useState([]);
  const [outgoerIds, setOutgoerIds] = useState([]);

  const highlightPath = useCallback(
    (node: { id: string }, nodes: any, edges: any, _selection: any) => {
      if (node && [...nodes, ...edges]) {
        const allIncomers = getAllIncomers(node, nodes, edges);
        const allOutgoers = getAllOutgoers(node, nodes, edges);

        setIncomerIds(allIncomers.map((incomer: any) => incomer.id));
        setOutgoerIds(allOutgoers.map((outgoer: any) => outgoer.id));
        // console.log('setting incomerIds: ', allIncomers);
        // console.log('setting outgoerIds: ', allOutgoers);

        // setNodes((prevElements) => {
        //   return prevElements?.map((elem: any) => {
        //     // const incomerIds = allIncomers.map((i: { id: any }) => i.id);
        //     // const outgoerIds = allOutgoers.map((o: { id: any }) => o.id);

        //     // if (isNode(elem) && (allOutgoers.length > 0 || allIncomers.length > 0)) {
        //     //   const highlight = elem.id === node.id || incomerIds.includes(elem.id) || outgoerIds.includes(elem.id);
        //     //   if (highlight) console.log('highlighting node: ', elem);
        //     //   elem.style = {
        //     //     ...elem.style,
        //     //     opacity: highlight ? 1 : 0.25,
        //     //   };
        //     // }

        //     if (isEdge(elem)) {
        //       // this is for user actually selecting edges, so this doesn't work for highlighting nodes
        //       // elem.style = {
        //       //   ...elem.style,
        //       //   stroke: selection ? 'blue' : '#b1b1b7',
        //       //   strokeWidth: selection ? 3 : 1, // Make it bold if it's in the path
        //       //   opacity: selection ? 1 : 0.25,
        //       // };
        //       // if (selection) {
        //       //   const animated =
        //       //     incomerIds.includes(elem.source) && (incomerIds.includes(elem.target) || node.id === elem.target);
        //       //   elem.animated = animated;
        //       //   elem.style = {
        //       //     ...elem.style,
        //       //     stroke: animated ? '#b1b1b7' : '#b1b1b7',
        //       //     opacity: animated ? 1 : 0.25,
        //       //   };
        //       // } else {
        //       //   elem.animated = false;
        //       //   elem.style = {
        //       //     ...elem.style,
        //       //     stroke: '#b1b1b7',
        //       //     opacity: 1,
        //       //   };
        //       // }
        //     }

        //     return elem;
        //   });
        // });
      }
    },
    [getAllIncomers, getAllOutgoers],
  );

  // If highlightPositionId is provided, highlight the path to that position
  useEffect(() => {
    if (highlightPositionId) {
      if (selectedNode?.id === highlightPositionId) {
        return;
      }
      // console.log('highlightPositionId passed in: ', highlightPositionId);
      const nodeToHighlight = nodes.find((node) => node.id === highlightPositionId);
      // console.log('nodeToHighlight: ', nodeToHighlight);
      if (nodeToHighlight) {
        highlightPath(nodeToHighlight, nodes, edges, true);
        setSelectedNode(nodeToHighlight);
      }
    }
  }, [highlightPositionId, nodes, edges, highlightPath, selectedNode]);

  let _selectedNode: any;
  const selectChangeCallback = useCallback(
    function (selectedElements: any) {
      // console.log('selectedElements: ', selectedElements);
      // console.log('currently selected node: ', selectedNode);
      if (disableCreateNewPosition) return;

      const node = selectedElements[0];
      if (!node || node.id === selectedNode?.id || _selectedNode?.id === node.id) {
        return;
      }
      // console.log('highlighting node: ', node);
      setSelectedNode(node);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      _selectedNode = node; // this function gets called multiople times within the same render cycle
      highlightPath(node, nodes, edges, true);
    },
    [selectedNode, nodes, edges, highlightPath],
  );

  const nodeTypes = useMemo(
    () => ({
      'org-chart-card': (nodeProps: any) => (
        <OrgChartCard
          {...nodeProps}
          selectedDepartment={selectedDepartment}
          onCreateNewPosition={onCreateNewPosition}
          orgChartData={{ nodes, edges }}
          selectChangeCallback={selectChangeCallback}
          selectedNode={selectedNode}
          incomerIds={incomerIds}
          outgoerIds={outgoerIds}
          disableCreateNewPosition={disableCreateNewPosition}
          allowSelection={allowSelection}
        />
      ),
    }),
    [
      selectedDepartment,
      onCreateNewPosition,
      nodes,
      edges,
      selectChangeCallback,
      selectedNode,
      incomerIds,
      outgoerIds,
      disableCreateNewPosition,
      allowSelection,
    ],
  );

  const resetNodeStyles = () => {
    // console.log('resetting node styles', disableCreateNewPosition);
    if (disableCreateNewPosition) return;
    setIncomerIds([]);
    setOutgoerIds([]);
    setNodes((prevElements: any[]) => {
      return prevElements?.map((elem: any) => {
        if (isNode(elem)) {
          elem.style = {
            ...elem.style,
            opacity: 1,
          };
        } else {
          elem.animated = false;
          elem.style = {
            ...elem.style,
            stroke: '#b1b1b7',
            opacity: 1,
          };
        }

        return elem;
      });
    });
  };
  // END HIGHILGHT PATH

  const addNodeAttachedToSpecificId = useCallback(
    (extraNodeInfo: any) => {
      if (!extraNodeInfo) return;

      const newNodeId = extraNodeInfo.nodeId;
      const newNode = {
        id: newNodeId, // Unique ID
        data: {
          id: newNodeId,

          employees: [],
          extra: true,
          ...extraNodeInfo,
        },
        type: 'org-chart-card',
        // position will be set by Dagre
      };

      const newEdge = {
        id: newNode.id + '-' + extraNodeInfo.targetNodeId,
        type: 'smoothstep',
        source: extraNodeInfo.targetNodeId,
        target: newNode.id,
      };

      const resetNodes = nodes.map(({ position, ...rest }) => ({ ...rest }));

      const updatedNodes = [...resetNodes, newNode];
      const updatedEdges = [...edges, newEdge];

      // console.log('updatedNodes: ', updatedNodes, 'updatedEdges: ', updatedEdges);
      // Apply Dagre layout with the new node and edge
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(updatedNodes, updatedEdges);

      // Update state
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    },
    [nodes, edges, setNodes, setEdges],
  );

  const [nodeAdded, setNodeAdded] = useState(false);
  useEffect(() => {
    if (!nodeAdded) {
      addNodeAttachedToSpecificId(extraNodeInfo);
    }
    setNodeAdded(true);
  }, [nodeAdded, addNodeAttachedToSpecificId, extraNodeInfo]);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      elementsSelectable={true}
      // onSelectionChange={(selectedElements) => {
      //   console.log('onSelectionChange: ', selectedElements);
      //   const node = selectedElements.nodes[0];
      //   if (!node) {
      //     return;
      //   }
      //   setSelectedNode(node);
      //   highlightPath(node, nodes, edges, true);
      //   // const tracedNodes = getAllTracedNodes(node, nodes, edges, [], false);
      //   // console.log('traced nodes: ', tracedNodes);
      // }}
      onPaneClick={() => {
        resetNodeStyles();
        setSelectedNode(undefined);
      }}
    >
      {/* <Panel position="top-left">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel> */}
      <Controls position="top-right" />
      <MiniMap pannable zoomable style={{ height: 100, width: 150 }} />
    </ReactFlow>
  );
};
