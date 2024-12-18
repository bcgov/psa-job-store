// OrgChartVisualization.tsx
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { Background, Edge, MiniMap, Node, NodeTypes, useReactFlow, useStoreApi } from 'reactflow';
import { PositionProvider } from '../../../../components/app/common/contexts/position.context';
import { Controls } from '../controls';
import { OrgChartKeyboardShortcutsModal } from '../org-chart-keyboard-shortcuts.modal';
import { convertData } from './org-chart-tree-view.component';

interface OrgChartFlowProps {
  edges: Edge[];
  nodes: Node[];
  nodeTypes: NodeTypes;
  onPaneClick: () => void;
  // departmentId: string;
  // wizardNextHandler?: (options?: { switchStep?: boolean }) => Promise<string | undefined>;
  // searchTerm?: string;
  // loading?: boolean;
  // treeViewInFocusCallback: (inFocus: boolean) => void;
  setSelectedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedNodeId: string | null;
  // isKeyboardNav is a ref
  isKeyboardNav: React.MutableRefObject<boolean>;
}

const OrgChartFlow: React.FC<OrgChartFlowProps> = ({
  edges,
  nodes,
  nodeTypes,
  onPaneClick,
  // departmentId,
  // wizardNextHandler,
  // searchTerm,
  // loading,
  // treeViewInFocusCallback,
  setSelectedNodeIds,
  selectedNodeId,
  isKeyboardNav,
}) => {
  const { setCenter } = useReactFlow();
  const store = useStoreApi();
  const { addSelectedNodes } = store.getState();
  const [isButtonFocused, setIsButtonFocused] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  // console.log('component render, isButtonFocused: ', isButtonFocused);

  useEffect(() => {
    if (selectedNodeId) {
      console.log('selectedNodeId useEffect hook: ', selectedNodeId);
      const node = nodes.find((n) => n.id === selectedNodeId);
      // console.log('node: ', node);
      if (node) {
        if (isKeyboardNav.current == true) {
          setCenter(node.position.x + (node.width ?? 0) / 2, node.position.y + (node.height ?? 0) / 2, {
            zoom: 1,
            duration: 0,
          });
          isKeyboardNav.current = false;
        }
      }
    }
  }, [selectedNodeId, nodes, setCenter]);

  const flowRef: RefObject<HTMLDivElement> = useRef(null);
  const [isFlowFocused, setIsFlowFocused] = useState(false);

  // console.log('nodes: ', nodes);

  const treeData = useMemo(() => convertData(nodes, edges), [nodes, edges]);

  const nodesWithLevel = useMemo(() => {
    return nodes.map((node) => {
      const treeNode = treeData.find((tn) => tn.id === node.id);
      return {
        ...node,
        data: {
          ...node.data,
          level: treeNode ? treeNode.level : 0,
          directReports: treeNode ? treeNode.directReports : 0,
        },
      };
    });
  }, [nodes, treeData]);

  const findNodeById = (id: string) => treeData.find((node) => node.id === id);

  const orderedNodes = useMemo(() => {
    const result: string[] = [];
    const queue: string[] = treeData.filter((node) => node.parent === 'root').map((node) => node.id);

    while (queue.length > 0) {
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const nodeId = queue.shift()!;
        result.push(nodeId);
        const node = treeData.find((n) => n.id === nodeId);
        if (node) {
          queue.push(...node.children);
        }
      }
    }

    return result;
  }, [treeData]);

  // console.log('treeData: ', treeData);

  const getCurrentNodeIndex = () => {
    // console.log('getCurrentNodeIndex, selectedNodeId: ', selectedNodeId);
    // console.log('orderedNodes: ', orderedNodes);
    return selectedNodeId ? orderedNodes.indexOf(selectedNodeId) : -1;
  };

  const hasNextNode = () => {
    const currentIndex = getCurrentNodeIndex();
    return currentIndex < orderedNodes.length - 1;
  };

  const hasPreviousNode = () => {
    const currentIndex = getCurrentNodeIndex();
    // console.log('hasPreviousNode, currentIndex: ', currentIndex);
    return currentIndex > 0;
  };

  const navigateNext = () => {
    // console.log('== navigateNext');
    const currentIndex = getCurrentNodeIndex();
    // console.log('currentIndex: ', currentIndex);
    if (currentIndex === -1) {
      // console.log('setting selected node to first node');
      updateSelectedNode(orderedNodes[0]);
    } else if (currentIndex < orderedNodes.length - 1) {
      // console.log('setting selected node to next node: ', currentIndex, orderedNodes[currentIndex + 1]);
      updateSelectedNode(orderedNodes[currentIndex + 1]);
    }
    // console.log('navigateNext, setting button focus to false');
    setIsButtonFocused(false);
  };

  const navigatePrevious = () => {
    const currentIndex = getCurrentNodeIndex();
    if (currentIndex === -1) {
      updateSelectedNode(orderedNodes[0]);
    } else if (currentIndex > 0) {
      updateSelectedNode(orderedNodes[currentIndex - 1]);
    }
    // console.log('navigatePrevious, setting button focus to false');
    setIsButtonFocused(false);
  };

  const findSiblings = (nodeId: string) => {
    const node = findNodeById(nodeId);
    if (!node) return [];
    if (node.parent === 'root') {
      return treeData.filter((n) => n.parent === 'root');
    }
    const parent = findNodeById(node.parent);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parent ? parent.children.map((childId: any) => findNodeById(childId)).filter(Boolean) : [];
  };

  // Update the selected node and focus on it - called from all arrow keys, etc
  const updateSelectedNode = (selectedNodeId = '', focusButton = false) => {
    // console.log('updateSelectedNode, nodeId/focusButton: ', selectedNodeId, focusButton);
    isKeyboardNav.current = true;
    addSelectedNodes([selectedNodeId]);
    setSelectedNodeIds([selectedNodeId]);

    // Focus on the selected node
    // this will read out aria-label
    // delay is needed because reactflow is moving the canvas to this node
    // if we focus before that, it may cause rendering issues
    // Focus on the selected node or its button
    setTimeout(() => {
      const nodeElement = document.getElementById(`node-${selectedNodeId}`);
      // console.log('nodeElement: ', nodeElement);
      if (nodeElement) {
        if (focusButton) {
          const buttonElement = nodeElement.querySelector('button');
          // console.log('button element: ', buttonElement);
          if (buttonElement) {
            buttonElement.focus();
          } else {
            nodeElement.focus();
          }
        } else {
          nodeElement.focus();
        }
      }
    }, 50);
  };

  const navigateUp = () => {
    if (!selectedNodeId) return;
    const node = findNodeById(selectedNodeId);
    if (node && node.parent !== 'root') {
      updateSelectedNode(node.parent);
    }
    setIsButtonFocused(false);
  };

  const navigateDown = () => {
    // console.log('navigateDown, selectedNodeId: ', selectedNodeId);
    if (!selectedNodeId) return;
    // console.log('selectedNodeId: ', selectedNodeId);
    const node = findNodeById(selectedNodeId);
    // console.log('node: ', node);
    if (node && node.children.length > 0) {
      // console.log('setting selectedNodeId: ', node.children[0]);
      updateSelectedNode(node.children[0]);
    }
    setIsButtonFocused(false);
  };

  const navigateLeft = () => {
    // console.log('== navigateLeft, selectedNodeId: ', selectedNodeId);
    if (!selectedNodeId) return;
    const siblings = findSiblings(selectedNodeId);
    // console.log('siblings: ', siblings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentIndex = siblings.findIndex((node: any) => node.id === selectedNodeId);
    // console.log('currentIndex: ', currentIndex);
    if (currentIndex > 0) {
      updateSelectedNode(siblings[currentIndex - 1].id);
    }
  };

  const navigateRight = () => {
    // console.log('== navigateRight, selectedNodeId: ', selectedNodeId);
    if (!selectedNodeId) return;
    const siblings = findSiblings(selectedNodeId);
    // console.log('siblings: ', siblings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentIndex = siblings.findIndex((node: any) => node.id === selectedNodeId);
    // console.log('currentIndex: ', currentIndex);
    if (currentIndex < siblings.length - 1) {
      updateSelectedNode(siblings[currentIndex + 1].id);
    }
  };

  const selectFirstRootNode = () => {
    const rootNodes = treeData.filter((node) => node.parent === 'root');
    if (rootNodes.length > 0) {
      updateSelectedNode(rootNodes[0].id);
    }
    setIsButtonFocused(false);
  };

  // console.log('isButtonFocused: ', isButtonFocused);

  // Update the handleKeyDown function
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // console.log('handleKeyDown: ', event.key);
      // console.log('isFlowFocused: ', isFlowFocused);

      if (!isFlowFocused) return;

      const { key, shiftKey } = event;
      switch (key) {
        case 'Escape':
          setSelectedNodeIds([]);
          setIsButtonFocused(false);
          document.getElementById('org-chart-search-input')?.focus();
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (selectedNodeId === null) {
            selectFirstRootNode();
          } else {
            navigateUp();
          }
          setIsButtonFocused(false);
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (selectedNodeId === null) {
            selectFirstRootNode();
          } else {
            navigateDown();
          }
          setIsButtonFocused(false);
          break;
        case 'ArrowLeft':
          // console.log('arrow left, selectedNodeId: ', selectedNodeId);
          event.preventDefault();
          if (selectedNodeId === null) {
            selectFirstRootNode();
          } else {
            navigateLeft();
          }
          setIsButtonFocused(false);
          break;
        case 'ArrowRight':
          // console.log('arrow right, selectedNodeId: ', selectedNodeId);
          event.preventDefault();
          if (selectedNodeId === null) {
            selectFirstRootNode();
          } else {
            navigateRight();
          }
          setIsButtonFocused(false);
          break;
        case '?': {
          // show the keyboard help modal
          event.preventDefault();
          showModal();
          break;
        }
        case 'Tab': {
          // console.log('TAB, isButtonFocused: ', isButtonFocused, 'selectedNodeId: ', selectedNodeId);
          if (!selectedNodeId) {
            // console.log('no selected node');
            event.preventDefault();
            navigateNext();
            return;
          }

          const nodeElement = document.getElementById(`node-${selectedNodeId}`);
          // console.log('node element: ', nodeElement);
          const buttonElement = nodeElement ? nodeElement.querySelector('button') : null;
          // console.log('button element: ', buttonElement);
          const isButtonDisabled = buttonElement ? buttonElement.disabled : true;

          if (shiftKey) {
            // console.log('shift key');
            // Shift+Tab (backward navigation)
            if (isButtonFocused) {
              // console.log('button focused');
              // If button is focused, move focus to the node
              setIsButtonFocused(false);
              updateSelectedNode(selectedNodeId, false);
            } else if (hasPreviousNode()) {
              // console.log('has previous node!');
              event.preventDefault();
              // If node is focused, move to the previous node and focus on the button
              navigatePrevious();

              let prevIndex = 0;
              const currentIndex = getCurrentNodeIndex();
              if (currentIndex === -1) {
                prevIndex = 0;
              } else if (currentIndex > 0) {
                prevIndex = currentIndex - 1;
              }

              // Check if the previous node has an enabled button
              const prevNodeId = orderedNodes[prevIndex];
              // console.log('prevNodeId: ', prevNodeId);
              const prevNode = findNodeById(prevNodeId);
              // console.log('prevNode: ', prevNode);
              if (prevNode && prevNode.employees.length != 0) {
                setTimeout(() => {
                  // console.log('TIMEOUT');
                  const prevNodeElement = document.getElementById(`node-${prevNodeId}`);
                  const prevButtonElement = prevNodeElement ? prevNodeElement.querySelector('button') : null;
                  // console.log('prevButtonElement: ', prevButtonElement);
                  if (prevButtonElement) {
                    setIsButtonFocused(true);
                    prevButtonElement.focus();
                  }
                }, 50);
              }
              // const prevNodeElement = document.getElementById(`node-${prevNodeId}`);
              // const prevButtonElement = prevNodeElement ? prevNodeElement.querySelector('button') : null;
              // const isPrevButtonDisabled = prevButtonElement ? prevButtonElement.disabled : true;
              // setIsButtonFocused(!isPrevButtonDisabled);
            } else {
              // console.log('no previous node!');
              document.getElementById('download-orgchart-button')?.focus();
              event.preventDefault();
            }
          } else {
            // console.log('no shift key, isButtonDisabled: ', isButtonDisabled, 'isButtonFocused: ', isButtonFocused);
            // Tab (forward navigation)
            if (isButtonFocused || isButtonDisabled) {
              // If button is focused or disabled, move to the next node
              if (hasNextNode()) {
                // console.log('has next node');
                event.preventDefault();
                navigateNext();
                setIsButtonFocused(false);
              } else {
                // console.log('no next node!');
                setSelectedNodeIds([]);
              }
            } else {
              // If node is focused and button is not disabled, focus on the button
              event.preventDefault();
              setIsButtonFocused(true);
              updateSelectedNode(selectedNodeId, true);
            }
          }
          break;
        }
      }
    },
    [isFlowFocused, selectedNodeId, isButtonFocused],
  );

  useEffect(() => {
    const currentFlowRef = flowRef.current;
    // console.log('binding to: ', currentFlowRef);
    if (currentFlowRef) {
      currentFlowRef.addEventListener('keydown', handleKeyDown);
      return () => {
        // console.log('removing keydown event listener');
        currentFlowRef.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  // console.log('treeData: ', treeData);
  return (
    <>
      <PositionProvider>
        {/* role application allows for arrow keys to work with screen readers, otherwise it gets overriden */}
        <div
          data-testid="org-chart-container"
          id="org-chart-container"
          role="application"
          aria-label="Organization chart - use arrow keys or tab to navigate. Press enter to create a new position."
          style={{ height: '100%', width: '100%' }}
          tabIndex={0}
          ref={flowRef}
          onFocus={() => setIsFlowFocused(true)}
          onBlur={() => setIsFlowFocused(false)}
        >
          <ReactFlow
            onPaneClick={() => {
              setSelectedNodeIds([]);
              setIsButtonFocused(false);
              onPaneClick();
            }}
            edges={edges}
            elevateEdgesOnSelect
            minZoom={0}
            nodeTypes={nodeTypes}
            nodes={nodesWithLevel}
            nodesConnectable={false}
            nodesDraggable={false}
            nodesFocusable={false}
            edgesFocusable={false}
            disableKeyboardA11y={true}

            // selectedNodes={selectedNodeId ? [selectedNodeId] : []}
          >
            <Background />
            <Controls position="top-right" showInteractive={false} />

            <MiniMap
              nodeStrokeWidth={3}
              pannable
              style={{ border: '1px solid #B1B1B1', height: 100, width: 150 }}
              zoomable
            />
          </ReactFlow>
        </div>
        <OrgChartKeyboardShortcutsModal isVisible={isModalVisible} onClose={handleClose} />
      </PositionProvider>
    </>
  );
};

export default OrgChartFlow;
