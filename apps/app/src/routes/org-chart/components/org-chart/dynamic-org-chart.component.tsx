import { Col, Row, Space, Spin } from 'antd';
import { autolayout } from 'common-kit';
import Fuse from 'fuse.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Edge, Node, NodeProps, useEdgesState, useNodesState, useOnSelectionChange, useReactFlow } from 'reactflow';
import { useLazyGetOrgChartQuery } from '../../../../redux/services/graphql-api/org-chart.api';
import { initialElements } from '../../constants/initial-elements.constant';
import { OrgChartContext } from '../../enums/org-chart-context.enum';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { Elements } from '../../interfaces/elements.interface';
import { getFocusedElements } from '../../utils/get-focused-elements.util';
import { DepartmentFilter } from '../department-filter.component';
import { OrgChartNode } from '../org-chart-node.component';
import { PositionSearch, SearchResult } from '../position-search.component';
import DownloadButton from './download-button.component';
import './dynamic-org-chart.component.css';
import OrgChartFlow from './org-chart-flow.component';

interface BaseDynamicOrgChartProps {
  type: OrgChartType.DYNAMIC;
  setDepartmentId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  departmentId: string | null | undefined;
  departmentIdIsLoading?: boolean;
  showDepartmentFilter?: boolean;
  targetId?: string | undefined;
  wrapProvider?: boolean;
  // wizardNextHandler?: ({ switchStep }?: { switchStep?: boolean }) => Promise<string | undefined>;
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
  showDepartmentFilter = true,
  targetId,
  // wizardNextHandler,
  ...props
}: DynamicOrgChartProps) => {
  const [elements, setElements] = useState<Elements>(initialElements);
  // const debounceSetElements = useMemo(() => debounce((elements: Elements) => setElements(elements), 500), []);

  const [getOrgChart, { currentData: orgChartData, isFetching: orgChartDataIsFetching }] = useLazyGetOrgChartQuery();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [selectedInitial, setSelectedInitial] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(targetId != null ? [targetId] : []);
  const [searchResultCount, setSearchResultCount] = useState<number>(0);

  const { fitView, setCenter } = useReactFlow();
  const [edges, setEdges] = useEdgesState([]);
  const [nodes, setNodes] = useNodesState([]);
  const isKeyboardNav = useRef(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // refetch data on department id change
  useEffect(() => {
    console.log('useEffect departmentId: ', departmentId);
    setSelectedInitial(false);
    setInitialized(false);
    setIsDirty(false);
    setSearchTerm(undefined);
    setElements(initialElements); // set to blank
    setNodes([]);
    setEdges([]);

    if (departmentId) getOrgChart(departmentId, false);
  }, [departmentId, getOrgChart]);

  const renderDefault = useCallback(
    (els: Elements) => {
      console.log('== renderDefault', els);
      const { edges, nodes } = els;

      edges.forEach((edge: Edge) => {
        edge.animated = false;
        edge.selected = false;
        edge.style = {
          stroke: '#B1B1B1',
        };
      });

      nodes.forEach((node: Node) => {
        node.data = {
          ...node.data,
          isSearchResult: false,
        };
        node.selected = false;
        node.style = {
          ...node.style,
          opacity: 1,
        };
      });
      // console.log('setNodes renderDefault: ', nodes);
      setEdges(edges);
      setNodes(nodes);
    },
    [setEdges, setNodes],
  );

  // render data when it changes (e.g. department change)
  useEffect(() => {
    if (orgChartData?.orgChart != null) {
      // console.log('== data changed', orgChartData?.orgChart);

      // add extra vertical space for nodes to accomodate "View position details" button
      const elements = autolayout(orgChartData?.orgChart, undefined, 260);

      // if (targetId != null) {
      //   const targetIndex = elements.nodes.findIndex((node: Node) => node.id === targetId);
      //   if (targetIndex >= 0) {
      //     const targetNode = elements.nodes[targetIndex];
      //     targetNode.selected = true;
      //     elements.nodes[targetIndex] = targetNode;
      //   }
      // }

      const els = JSON.parse(JSON.stringify(elements));
      console.log('data changed, setElements: ', els);
      setElements(els);
      renderDefault(els);
    }
  }, [orgChartData?.orgChart, setElements, renderDefault]);

  // Function to render selected nodes and their connected elements
  const renderSelectedNodes = useCallback(
    (sNodeIds: string[]) => {
      console.log('== renderSelectedNodes: ', sNodeIds);

      // Create a deep copy of the original elements object
      const { edges, nodes } = JSON.parse(JSON.stringify(elements));

      // Get focused elements (both incoming and outgoing connections)
      const focusedElements = [
        ...getFocusedElements(
          nodes.filter((node: Node) => sNodeIds.includes(node.id)),
          elements,
          true, // Incoming connections
        ),
        ...getFocusedElements(
          nodes.filter((node: Node) => sNodeIds.includes(node.id)),
          elements,
          false, // Outgoing connections
        ),
      ];
      const focusedElementIds = focusedElements.flatMap((el) => el.id);
      console.log('renderSelectedNodes focusedElementIds: ', focusedElementIds);

      // Update edge styles based on focused elements
      edges.forEach((edge: Edge) => {
        edge.animated = focusedElementIds.includes(edge.id);
        // edge.selected = focusedElementIds.includes(edge.id);

        edge.style = {
          ...edge.style,
          stroke: focusedElementIds.includes(edge.id) ? 'blue' : '#B1B1B1',
        };
      });

      // Update node styles and data based on selection and focus
      nodes.forEach((node: Node) => {
        node.data = {
          ...node.data,
          isSearchResult: false,
        };
        if (sNodeIds.includes(node.id)) console.log('renderSelectedNodes setting node to selected: ', node.id);
        node.selected = sNodeIds.includes(node.id);
        // node.data.selectedRender = sNodeIds.includes(node.id);
        node.style = {
          ...node.style,
          opacity:
            sNodeIds.length > 0 ? (sNodeIds.includes(node.id) || focusedElementIds.includes(node.id) ? 1 : 0.25) : 1,
        };
      });

      console.log('renderSelectedNodes setNodes, nodes: ', JSON.parse(JSON.stringify(nodes)));
      // Update the edges and nodes in the state
      setEdges(edges);
      setNodes(nodes);
    },
    [elements, setEdges, setNodes],
  );

  // this function handles selection of an item in search results
  const handleSelectResult = useCallback(
    (id: string, focus: boolean = true) => {
      console.log('== handleSelectResult: ', id);
      setSelectedNodeIds([id]);
      renderSelectedNodes([id]);
      const node = nodes.find((node) => node.id === id);
      if (node) {
        console.log('handleSelectResult centering to: ', node.position.x, node.position.y, node.width, node.height);
        setCenter(node.position.x + (node.width ?? 0) / 2, node.position.y + (node.height ?? 0) / 2, {
          zoom: 1,
          duration: 0,
        });
        setTimeout(() => {
          const nodeElement = document.getElementById(`node-${id}`);
          console.log('handleSelectResult nodeElement focus: ', nodeElement);
          if (nodeElement) {
            focus && nodeElement.focus();
          } else {
            console.log('handleSelectResult nodeElement not found: ', id);
          }
        }, 600);
      } else {
        console.log('handleSelectResult node not found: ', id, ' in nodes: ', JSON.parse(JSON.stringify(nodes)));
      }
    },
    [setCenter, renderSelectedNodes, nodes],
  );

  // this useEffect is to handle the initial selection of a node when the org chart is first loaded
  useEffect(() => {
    if (initialized && targetId != null && !selectedInitial && nodes.length > 0 && !orgChartDataIsFetching) {
      console.log('== setting initial, nodes: ', targetId, nodes);
      // check that this node is present in the nodes (may not be if we're on different department)
      const targetNode = nodes.find((node) => node.id === targetId);
      setSelectedInitial(true);

      if (!targetNode) {
        console.log('setting initial, targetNode not found');
        return;
      }
      setTimeout(() => {
        handleSelectResult(targetId, false);
      }, 0);
      setSelectedInitial(true);
    }
  }, [initialized, targetId, handleSelectResult, selectedInitial, nodes, orgChartDataIsFetching]);

  // callback to outside when selected nodes change
  useEffect(() => {
    if (type === OrgChartType.DYNAMIC && props.context === OrgChartContext.WIZARD) {
      // do not clear selection unless user actually clicked on the pane
      // this prevents clearing of selection when the org chart is first loaded with a targetId set
      if (selectedNodeIds.length == 0 && !isDirty) {
        return;
      }
      props.onSelectedNodeIdsChange(selectedNodeIds, { edges, nodes });
    }
  }, [props.context, edges, nodes, selectedNodeIds, isDirty, type]);

  // fit view when nodes change:
  // 1. when the org chart is first loaded
  // 2. when the user searches
  useEffect(() => {
    if (nodes.length === 0) return;

    console.log('== useEffect nodes: ', JSON.parse(JSON.stringify(nodes)));
    const searchResultNodes = nodes.filter((node) => node.data.isSearchResult === true);
    const selectedNodes = nodes.filter((node) => node.selected === true);

    if (selectedNodes.length > 0) {
      // console.log('fitView A: ', selectedNodes, adjacentNodes);
      // fitView({ duration: 800, nodes: [...selectedNodes, ...adjacentNodes] });
    } else if (searchResultNodes.length > 0) {
      // if there's only one result, we will select that node
      if (searchResultNodes.length != 1) {
        console.log('fitView B: ', searchResultNodes);
        fitView({ duration: 800, nodes: searchResultNodes });
      }
    } else {
      if (isDirty === false) {
        console.log('fitView C: ', nodes);
        fitView({ duration: 0, nodes });
        setInitialized(true);
      }
    }
  }, [nodes, fitView, isDirty]);

  // hook for when user selects a node
  useOnSelectionChange({
    onChange: ({ nodes: selectedNodes }) => {
      console.log('== useOnSelectionChange selectedNodes: ', selectedNodes);
      const nodeIds = selectedNodes.flatMap((node) => node.id);
      // if (JSON.stringify(nodeIds) != JSON.stringify(selectedNodeIds)) {
      // check if the selected nodes have changed
      console.log('useOnSelectionChange nodeIds: ', nodeIds, 'nodes: ', JSON.parse(JSON.stringify(nodes)));

      setSelectedNodeIds(nodeIds);

      if (nodeIds.length == 0) return;

      // if (searchTerm != null && searchTerm.length > 0 && nodeIds.length === 0) {
      //   // this is to handle when user selected a node, then did a search
      //   // search will clear the selected nodes, so we want to show search results instead of default
      //   console.log('onSearch');
      //   onSearch(searchTerm, { source: 'input' });
      // } else {
      // if user is navigating using keyboard throughout the treeview, do not run this
      // since we want to focus on the individual single node to bring into focus
      // if (!treeViewInFocus.current)
      renderSelectedNodes(nodeIds);
      // }
      // } else {
      //   console.log('NOT CHANGED, nodeIds/selectedNodeIds: ', nodeIds, selectedNodeIds);
      // }

      // once user interracted with the org chart, mark this component as "dirty"
      if (selectedNodes.length > 0) {
        setIsDirty(true);
        // setSearchTerm(undefined);
      }
    },
  });

  const nodeTypes = useMemo(() => {
    return {
      'org-chart-card': ({ ...nodeProps }: NodeProps) => (
        <OrgChartNode
          {...nodeProps}
          isConnectable={false}
          // pass in current state of edges and nodes (elements.edges and elements.nodes is the initial state)
          // this way the data for orgchart_json contains the current state of the org chart
          // with selected nodes and edges
          orgChartData={{ edges: edges, nodes: nodes }}
          orgChartContext={props.context}
          orgChartType={type}
        />
      ),
    };
  }, [props.context, edges, nodes, type]);

  // action to perform when user searches
  const onSearch = (term: string, source?: { source?: 'input' | 'clear' }) => {
    console.log('== onSearch: ', term, source);

    const { edges, nodes } = JSON.parse(JSON.stringify(elements));
    const sSearchTerm = source?.source === 'clear' ? undefined : term.length > 0 ? term : undefined;
    setSearchTerm(sSearchTerm);

    if (sSearchTerm != null && sSearchTerm.length > 0) {
      const searchResultIds = search(sSearchTerm);

      // console.log('searchResultIds: ', searchResultIds);
      const results = nodes
        .filter((node: Node) => searchResultIds.includes(node.id))
        .flatMap((node: Node) => {
          console.log('processing node: ', node);
          const employees =
            node.data.employees && node.data.employees.length > 0 ? node.data.employees : [{ name: 'Vacant' }];

          const classification = node.data.classification?.code || 'N/A';
          const positionNumber = node.data.id || 'N/A';

          const res = employees.map((employee: any) => ({
            id: node.id,
            title: `${employee.name} - ${node.data.title || node.id} (${classification}) - ${positionNumber}`,
          }));
          // if (res.length > 1) return res.slice(0, 1);
          console.log('res: ', res);
          return res;
        });
      console.log('setting search results: ', results);
      setSearchResults(results);

      if (searchResultIds.length > 1) {
        console.log('onSearch, more than 1 result');
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
            isSearchResult: searchResultIds.includes(node.id),
          };
          node.selected = false;
          node.style = {
            ...node.style,
            opacity: 1,
          };
        });

        console.log('onSearch setNodes');
        setEdges(edges);
        setNodes(nodes);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSearchResultCount(results.length);
    } else {
      console.log('onSearch, no search term, resetting nodes');
      setSearchResults([]);
      setSearchResultCount(0);
      setEdges(edges);
      setNodes(nodes);
    }
  };

  // Search function using Fuse.js
  const search = useCallback(
    (searchTerm: string | undefined) => {
      if (searchTerm == null) return [];

      // For the ID search, don't include positions where position_status === 'PROPOSED'
      const approvedPositionNodes = elements.nodes.filter((node) => node.data.position_status === 'Approved');
      const idSearch = new Fuse(approvedPositionNodes, {
        keys: ['id'],
        includeMatches: true,
        includeScore: true,
        threshold: 0,
        findAllMatches: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
      });

      // console.log('searching nodes: ', searchTerm, elements.nodes);
      const stringSearch = new Fuse(elements.nodes, {
        keys: ['data.title', 'data.employees.name'],
        includeMatches: true,
        includeScore: true,
        threshold: 0.25,
      });

      const idResults = idSearch.search(searchTerm);
      const stringResults = stringSearch.search(searchTerm);

      const searchResults = [...idResults.map((r) => r.item), ...stringResults.map((r) => r.item)].flatMap(
        (node) => node.id,
      );
      // console.log('searchResults: ', searchResults);
      return searchResults;
    },
    [elements.nodes],
  );

  if (orgChartDataIsFetching || !initialized)
    console.log('not rendering yet, orgChartDataIsFetching: ', orgChartDataIsFetching, 'initialized: ', initialized);
  else console.log('rendering');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }} data-testid="org-chart">
      <Row gutter={[8, 8]} justify="space-between" style={{ margin: '0.5rem 1rem' }}>
        <Col xs={24} md={8}>
          <PositionSearch
            onSearch={onSearch}
            disabled={departmentId == null || departmentIdIsLoading}
            searchResultsCount={searchTerm ? searchResultCount : null}
            searchTerm={searchTerm}
            searchResults={searchResults}
            onSelectResult={handleSelectResult}
          />
        </Col>
        <Col xs={24} md={{ span: 8, offset: 8 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {showDepartmentFilter && (
              <DepartmentFilter
                setDepartmentId={setDepartmentId}
                departmentId={departmentId}
                loading={departmentIdIsLoading}
              />
            )}
            <div
              style={{ position: 'absolute', bottom: showDepartmentFilter ? '-32px' : '0', right: '0', zIndex: '1' }}
            >
              <DownloadButton />
            </div>
          </Space>
        </Col>
      </Row>

      {orgChartDataIsFetching || !initialized ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
          data-testid="org-chart-loading"
        >
          <Spin spinning style={{ margin: 'auto' }} />
        </div>
      ) : (
        <>
          <OrgChartFlow
            edges={edges}
            nodes={nodes}
            nodeTypes={nodeTypes}
            // departmentId={departmentId ?? ''}
            // wizardNextHandler={wizardNextHandler}
            // searchTerm={searchTerm}
            // loading={!dataUpdated}
            // treeViewInFocusCallback={treeViewInFocusCallback}
            setSelectedNodeIds={setSelectedNodeIds}
            selectedNodeId={selectedNodeIds?.[0] ?? null}
            isKeyboardNav={isKeyboardNav}
            onPaneClick={() => {
              console.log('onPaneClick, searchTerm: ', searchTerm);
              setIsDirty(true);
              // setSearchTerm(undefined);
              setSelectedNodeIds([]);

              // if (searchTerm != null && searchTerm.length > 0) {
              //   onSearch(searchTerm, { source: 'input' });
              // } else {
              renderSelectedNodes([]);
              // }
            }}
          />
        </>
      )}
    </div>
  );
};
