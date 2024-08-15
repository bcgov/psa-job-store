import { Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import TreeView, { INode } from 'react-accessible-treeview';
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import { Edge, Node, useStoreApi } from 'reactflow';
import { usePosition } from '../../../../components/app/common/contexts/position.context';
import useAnnounce from '../../../../components/app/common/hooks/announce';
import { filterTree } from '../../../../components/app/common/utils/treeSearchUtils';
import './org-chart-tree-view.component.css';

const OrgChartTreeView = ({
  data,
  departmentId,
  setSelectedNodeId,
  wizardNextHandler,
  searchTerm,
  loading,
  treeViewInFocusCallback,
}: {
  data: { nodes: Node[]; edges: Edge[] };
  departmentId: string;
  setSelectedNodeId: (id: string | null) => void;
  wizardNextHandler?: ({ switchStep }?: { switchStep?: boolean }) => Promise<string | undefined>;
  searchTerm?: string;
  loading?: boolean;
  treeViewInFocusCallback: (inFocus: boolean) => void;
}) => {
  // console.log('departmentId: ', departmentId, data);
  const { createNewPosition } = usePosition();
  const store = useStoreApi();
  const { addSelectedNodes } = store.getState();
  const [finalTreeData, setFinalTreeData] = useState([] as INode<IFlatMetadata>[]);
  const [initialSet, setInitialSet] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [renderKey, setRenderKey] = useState(0);
  const [lastFocusInner, setLastFocusInner] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { announce, announcement } = useAnnounce();

  const convertData = (nodes: Node[], edges: Edge[]) => {
    const nodeMap = new Map();

    // Create a map of all nodes
    nodes.forEach((node) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const employeeNames = node.data.employees.map((e: any) => e.name).join(' ');
      const searchString = `
        ${node.data.title}
        ${employeeNames}
        ${node.data.department.id}
        ${node.data.id}
        ${node.data.classification?.name || ''}
      `
        .toLowerCase()
        .trim();

      nodeMap.set(node.data.id, {
        name: node.data.title,
        id: node.data.id,
        children: [],
        parent: null,
        employees: node.data.employees,
        departmentId: node.data.department.id,
        positionNumber: node.data.id,
        classification: node.data.classification,
        directReports: 0, // Initialize direct reports count
        metadata: { searchString },
        ...node.data,
      });
    });

    // Process edges to establish parent-child relationships
    edges.forEach((edge) => {
      const parent = nodeMap.get(edge.source);
      const child = nodeMap.get(edge.target);
      if (parent && child) {
        if (!parent.children.includes(child.id)) {
          parent.children.push(child.id);
          parent.directReports++; // Increment direct reports count
        }
        child.parent = parent.id;
      }
    });

    // Identify root nodes (nodes without parents)
    const rootNodes = Array.from(nodeMap.values()).filter((node) => !node.parent);

    // Create a root node if there are multiple root nodes or no root nodes
    // if (rootNodes.length !== 1) {
    const rootNode = {
      name: 'Organization',
      id: 'root',
      children: rootNodes.map((node) => node.id),
      parent: null,
      employees: [],
      departmentId: '',
      positionNumber: '',
      classification: { name: '' },
      metadata: { searchString: '' },
    };
    nodeMap.set('root', rootNode);
    rootNodes.forEach((node) => (node.parent = 'root'));
    // }

    // Sort function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortNodes = (nodeIds: any[]) => {
      return nodeIds.sort((aId, bId) => {
        const a = nodeMap.get(aId);
        const b = nodeMap.get(bId);
        // Nodes with children come first
        if (a.children.length && !b.children.length) return -1;
        if (!a.children.length && b.children.length) return 1;
        // Then sort alphabetically
        return a.name.localeCompare(b.name);
      });
    };

    // Recursively sort children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortChildren = (nodeId: any) => {
      const node = nodeMap.get(nodeId);
      if (node.children.length > 0) {
        node.children = sortNodes(node.children);
        node.children.forEach(sortChildren);
      }
    };

    // Sort root nodes
    const sortedRootIds = sortNodes(Array.from(nodeMap.keys()));

    // Recursively sort all nodes
    sortedRootIds.forEach(sortChildren);

    // Convert the map to a sorted array
    return sortedRootIds.map((id) => nodeMap.get(id));
  };

  const treeData = convertData(data.nodes, data.edges);
  // console.log('treeData: ', treeData, data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderNode = ({ element, isBranch, isExpanded, getNodeProps, level }: any) => {
    const employeeNames =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      element.employees.length > 0 ? element.employees.map((e: any) => e.name).join(', ') : 'Vacant';

    // const nodeProps = getNodeProps();
    // console.log('element/nodeProps:', element, nodeProps);

    const nodeProps = {
      ...getNodeProps(),
      style: { paddingLeft: level * 20 + 'px' },
      className: 'org-chart-node',
      'data-rct-node-id': element.id,
    };

    // Only add tabIndex if in search mode
    // if (searchMode) {
    //   nodeProps.tabIndex = element.metadata.isPartOfSearch ? 0 : -1;
    // }

    return (
      <div {...nodeProps}>
        {/* <span>
          {element.metadata.isPartOfSearch ? 'Y' : 'N'}, searchMode: {searchMode ? 'Y' : 'N'}
        </span> */}
        <span aria-hidden>
          {isBranch && (isExpanded ? '📂' : '📁')}
          {!isBranch && '📄'}
        </span>
        {employeeNames} - {element.name} - {element.classification?.name} -{' '}
        {element.directReports == 0 ? '' : element.directReports.toString() + ' Direct Reports -'}
        Dept ID: {element.departmentId} - Position #: {element.positionNumber}
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = async ({ element }: any) => {
    // console.log('on select');

    // Check if the position is vacant
    if (element.employees.length === 0) {
      announce("You can't create a position under a vacant position.");
      Modal.warning({
        title: 'Cannot Create Position',
        content: "You can't create a position under a vacant position.",
      });
      return;
    }

    // if we're on wizard, call the next button handler
    if (wizardNextHandler) {
      wizardNextHandler();
      return;
    }

    // Show confirmation dialog
    announce('Proceed to the next step for creating a new position?');
    Modal.confirm({
      title: 'Create New Position',
      content: 'Proceed to the next step for creating a new position?',
      onOk: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        // const png = await generatePNGBase64(getNodes);
        await createNewPosition({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reportingPositionId: element.id as any,
          selectedDepartment: departmentId,
          orgChartData: data,
          // svg: '',
        });
      },
      onCancel() {
        // console.log('Create position cancelled');
      },
    });
  };

  useEffect(() => {
    // this handles department switching
    // console.log('updating renderkey from loading');
    setRenderKey((prevKey) => prevKey + 1);
    // setRender(false);
    // setTimeout(() => {
    //   setRender(true);
    // }, 1000);
    if (!loading) {
      setFinalTreeData(treeData);
    }
  }, [loading]);

  useEffect(() => {
    // handle search
    setRenderKey((prevKey) => prevKey + 1);
    if (!searchTerm || searchTerm.trim() == '') {
      setSearchMode(false);
      return;
    }

    const valueToFilter = searchTerm.trim();
    let treeDataSet = null;
    if (valueToFilter) {
      // console.log('searching treeData: ', valueToFilter, treeData);
      treeDataSet = filterTree(treeData, valueToFilter, 'searchString');
      const matchCount = treeDataSet.filter((node) => node.metadata?.isPartOfSearch).length;
      announce(`${matchCount} results found for "${searchTerm}"`);
      setSearchMode(true);
    } else {
      // console.log('no filter, setting to flattenedData: ', flattenedData);
      treeDataSet = treeData;
    }
    setFinalTreeData(treeDataSet);

    const expIds = treeDataSet.map((node) => node.id.toString());
    // console.log('setting expanded ids 2: ', expIds, treeDataSet);
    setExpandedIds(expIds);

    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (!initialSet && treeData.length > 1) {
      setFinalTreeData(treeData);
      setInitialSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData]);

  // if in search mode, we need to expand all nodes and make nodes that do not contain search term not focusable
  useEffect(() => {
    if (searchMode) {
      // const expIds = finalTreeData.map((node) => node.id.toString());
      // // console.log('setting expanded ids: ', expIds, finalTreeData);
      // setExpandedIds(expIds);
      // setRenderKey((prevKey) => prevKey + 1);
      // setIsLoading(true);
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 0);
    } else {
      setExpandedIds([]);
      setFinalTreeData(treeData);
    }
  }, [searchMode]);

  // console.log('treeview loading: ', loading);

  // HANDLE CONTAINER FOCUS
  const [containerHasFocus, setContainerHasFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setupFocusListeners = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // console.log('setting up listener: ', container);

    const handleFocusIn = () => {
      // console.log('focus in');
      setContainerHasFocus(true);
    };

    const handleFocusOut = () => {
      // console.log('focus out');
      setContainerHasFocus(false);
    };

    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (containerRef.current) {
      cleanup = setupFocusListeners();
    } else {
      const observer = new MutationObserver((_mutations, obs) => {
        if (containerRef.current) {
          cleanup = setupFocusListeners();
          obs.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
        if (cleanup) cleanup();
      };
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [setupFocusListeners]);

  useEffect(() => {
    // console.log('containerHasFocus: ', containerHasFocus);
    treeViewInFocusCallback(containerHasFocus);
  }, [containerHasFocus, treeViewInFocusCallback]);

  // if (!render) return <>no render</>;
  if (finalTreeData.length === 0 || loading) return <></>;

  // console.log('finalTreeData: ', finalTreeData);

  return (
    <div
      ref={containerRef}
      onBlur={(e) => {
        setSelectedIds([]); // clear selected nodes on change, so user can press enter repeadetly to select
        // Prevent the event from bubbling up to parent elements
        e.stopPropagation();

        // Check if the new focus target is outside of this div
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // console.log('User has exited the div');
          setLastFocusInner(false);
        } else {
          // console.log('Focus is still within the div');
        }
      }}
      onFocus={(e) => {
        setSelectedIds([]); // clear selected nodes on change, so user can press enter repeadetly to select
        setLastFocusInner(true);

        // console.log('on focus outer', e.target, e);

        // Function to find the node element or its closest ancestor
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const findNodeElement = (element: any) => {
          // Check if the element itself is the node
          if (element.classList.contains('org-chart-node')) {
            return element;
          }

          // Check if it's the li element containing the node
          if (element.tagName.toLowerCase() === 'li' && element.getAttribute('role') === 'treeitem') {
            return element.querySelector('.org-chart-node');
          }

          // If neither, return null
          return null;
        };

        // Find the node element
        const nodeElement = findNodeElement(e.target);

        if (nodeElement) {
          // Extract the ID from the data attribute
          const nodeId = nodeElement.getAttribute('data-rct-node-id');

          // if we're in search mode and focus is on the first element
          // (library allows focus on first element via tab, and we can't control that)
          // then switch focus on first search result instead
          // if (searchMode) {
          // console.log('in search mode, checking if focus is on first element');
          const firstElement = document.querySelector('.org-chart-node');
          // const firstSearchResult = document.querySelector('.org-chart-node[data-rct-node-id][tabindex="0"]');

          // console.log('firstElement/firstSearchResult/nodeElement: ', firstElement, firstSearchResult, nodeElement);

          if (nodeElement === firstElement) {
            // && firstSearchResult && firstSearchResult !== firstElement) {
            // console.log('lastFocusInner: ', lastFocusInner);
            if (!lastFocusInner) {
              // e.preventDefault();
              // firstSearchResult.focus();
              announce('You entered org chart, use arrow keys to navigate. Press enter to select position.');
              // return;
            } else {
              // focus on the previous focusable element relative to this div
              // document.getElementById('org-chart-search-button')?.focus();
              // return;
            }
          }
          // }

          if (nodeId) {
            // console.log('Node focused:', nodeId);
            setSelectedNodeId(nodeId);
            addSelectedNodes([nodeId]);
          }
        }
      }}
    >
      <div aria-live="polite" className="visually-hidden">
        {announcement}
      </div>

      {/* <div aria-live="polite">{announcement}</div> */}
      <TreeView
        key={renderKey}
        data={finalTreeData}
        className="org-chart-tree"
        nodeRenderer={renderNode}
        selectedIds={selectedIds}
        expandedIds={expandedIds}
        // expandOnKeyboardSelect={true}
        // selectedIds={selectedNodeId ? [selectedNodeId] : []}
        onNodeSelect={({ element }) => {
          // console.log('on node select');
          handleSelect({ element });
          // setSelectedNodeId(element.id.toString());
        }}
        // onSelect={async ({ element }) => {}}
      />
    </div>
  );
};

export default OrgChartTreeView;
