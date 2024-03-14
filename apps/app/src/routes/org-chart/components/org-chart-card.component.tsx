/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleFilled, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popover, Row, Typography } from 'antd';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Connection, Edge, Handle, Node, NodeProps, Position, useOnSelectionChange, useReactFlow } from 'reactflow';
import { usePosition } from '../../../components/app/common/contexts/position.context';
import { EllipsisTooltip } from './ellipsis-tooltip.component';
import './org-chart-card.component.css';

const { Text } = Typography;

// const targetHandleStyle: CSSProperties = { background: '#555' };
// const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
// const sourceHandleStyleB: CSSProperties = {
//   ...targetHandleStyle,
//   bottom: 10,
//   top: 'auto',
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onConnect = (_params: Connection | Edge) => {
  // console.log('handle onConnect', params)
};

export const OrgChartCard = memo(
  ({
    data,
    isConnectable,
    selectedDepartment,
    onCreateNewPosition,
    orgChartData,
    selectChangeCallback,
    selectedNode,
    incomerIds,
    outgoerIds,
    disableCreateNewPosition = false,
    allowSelection = false, // will mark the card as selected if true instead of showing the popover
  }: NodeProps & {
    selectedDepartment: string | null;
    onCreateNewPosition: () => void | null;
    orgChartData: { nodes: Node[]; edges: Edge[] };
    selectChangeCallback?: (nodes: Node[]) => void;
    selectedNode?: Node | null;
    incomerIds?: string[];
    outgoerIds?: string[];
    disableCreateNewPosition?: boolean;
    allowSelection?: boolean;
  }) => {
    // const onStart = useCallback((viewport: Viewport) => console.log('onStart', viewport), []);
    // const onChange = useCallback((viewport: Viewport) => console.log('onChange', viewport), []);
    // const onEnd = useCallback((viewport: Viewport) => console.log('onEnd', viewport), []);

    // useOnViewportChange({
    //   onStart,
    //   onChange,
    //   onEnd,
    // });

    const [isPopoverVisible] = useState(selectedNode?.id == data.id && !disableCreateNewPosition);

    useOnSelectionChange({
      onChange: ({ nodes }) => {
        // console.log(
        //   'onSelectionChange',
        //   nodes,
        //   'selectedNode: ',
        //   selectedNode,
        //   'disableCreateNewPosition: ',
        //   disableCreateNewPosition,
        // );
        // if (!disableCreateNewPosition) {
        //   if (selectedNode != null && selectedNode.id === data.id) {
        //     console.log('SET VISIBLE true 2');
        //     setIsPopoverVisible(true); // Show the Popover when a node is selected
        //   } else {
        //     console.log('SET VISIBLE false', data);
        //     setIsPopoverVisible(false); // Hide the Popover otherwise
        //   }
        // }
        if (selectChangeCallback) selectChangeCallback(nodes);
      },
    });

    const { createNewPosition } = usePosition();
    const createDirectReport = async () => {
      // // we are not editing a draft position request (creatign position from dashboard or from org chart page)
      // // console.log('orgChartData: ', orgChartData);

      // if (!location.pathname.startsWith('/my-positions/')) {
      //   const positionRequestInput = {
      //     step: 1,
      //     title: 'Untitled',
      //     reports_to_position_id: reportingPositionId,
      //     department: { connect: { id: selectedDepartment ?? '' } },
      //     orgchart_json: orgChartData,
      //   };
      //   // 'CreatePositionRequestInput': profile_json, parent_job_profile, title, classification_code
      //   const resp = await createPositionRequest(positionRequestInput).unwrap();
      //   setPositionRequestId(resp.createPositionRequest);
      //   navigate(`/my-positions/${resp.createPositionRequest}`, { replace: true });
      // } else {
      //   // we are editing a draft position request - update existing position request
      //   if (positionRequestId != null && selectedDepartment != null) {
      //     await updatePositionRequest({
      //       id: positionRequestId,
      //       step: 1,
      //       reports_to_position_id: reportingPositionId,
      //       department: { connect: { id: selectedDepartment } },
      //       orgchart_json: orgChartData,
      //     }).unwrap();
      //   }
      // }
      // console.log('createDirectReport, selectedDepartment: ', selectedDepartment, 'orgChartData: ', orgChartData);
      if (selectedDepartment == null) return;
      await createNewPosition(data.id, selectedDepartment, orgChartData);
      if (onCreateNewPosition) onCreateNewPosition();
    };

    const isNodeSelected = selectedNode?.id === data.id;
    const isNodeIncomer = incomerIds?.includes(data.id);
    const isNodeOutgoer = outgoerIds?.includes(data.id);

    // Define header styling based on node status
    let headerStyle = {
      backgroundColor: '#F3F3F3',
      color: 'inherit',
    };
    if (isNodeSelected) {
      headerStyle = {
        ...headerStyle,
        backgroundColor: '#0070E0',
        color: 'white',
      };
    } else if (isNodeIncomer || isNodeOutgoer) {
      headerStyle = {
        ...headerStyle,
        backgroundColor: '#036', // Example color for incomers and outgoers
        color: 'white',
      };
    }

    // if (data.id == 'xxxxx') console.log('isPopoverVisible: ', isPopoverVisible, 'selectedNode: ', selectedNode);

    if (data.extra) {
      console.log('data.extra: ', data);
    }

    // TOOLTIP POSITIONING
    const [popoverVisibility, setPopoverVisibility] = useState('hidden');

    const cardRef = useRef(null);

    const reactFlowInstance = useReactFlow();
    const [scale, setScale] = useState(1);

    const popoverStyle = useMemo(() => {
      return {
        visibility: popoverVisibility as 'visible' | 'hidden',
        transform: `scale(${scale})`,
      };
    }, [scale, popoverVisibility]);

    useEffect(() => {
      setPopoverVisibility('visible');
    }, [scale]);

    useEffect(() => {
      if (selectedNode?.id != data.id) return;
      // Function to update scale based on zoom level
      const updateScale = () => {
        const zoom = reactFlowInstance.getZoom();
        if (zoom !== 0) {
          let newScale = 1;
          if (zoom < 1) {
            // If zoomed out, scale inversely
            newScale = (1 / zoom) * 1.1;
          } else if (zoom > 1) {
            // If zoomed in, increase size
            // Apply a moderated scaling formula for zoomed in
            // Example: logarithmic scaling (you can adjust the formula as needed)
            newScale = 1 + Math.log(zoom) * 0.5;
          }
          setScale(newScale);
        }
      };

      // Polling for zoom level changes
      const intervalId = setInterval(() => {
        updateScale();
      }, 50); // Adjust interval as needed

      updateScale(); // Initial update

      return () => clearInterval(intervalId);
    }, [reactFlowInstance, selectedNode, data.id, popoverStyle]);

    // SELECT MODE

    // useEffect(() => {

    // },[]);
    return (
      <>
        <Handle type="target" position={Position.Top} onConnect={onConnect} />
        {/* <Popover
          overlayInnerStyle={{ padding: 0 }}
          open={isPopoverVisible}
          placement="bottom"
          trigger="click"
          content={() => {
            // console.log(data.employees);

            return (
              <Button type="default" onClick={createNewPosition} icon={<UserAddOutlined />}>
                Create new direct report
              </Button>
            );
          }}
        > */}
        <div ref={cardRef} className="cardContainer" data-testid={`org-chart-node-${data.id}`}>
          <Card
            size="small"
            style={{ border: '1px solid #A1A1A1', cursor: 'pointer' }}
            headStyle={{ ...headerStyle }}
            title={
              <Row style={{ width: '100%' }} gutter={8}>
                <Col style={{ flex: 1, minWidth: 0 }}>
                  {/* <Text ellipsis style={{ ...headerStyle, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {data.title}
                  </Text> */}
                  <EllipsisTooltip>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{data.title}</span>
                  </EllipsisTooltip>
                </Col>
                <Col style={{ flex: 'none', paddingLeft: 8 }}>
                  <Text style={{ ...headerStyle }}>{data.classification?.code}</Text>
                </Col>
              </Row>
            }
          >
            {/* Employees:
          <ul>
            {data.employees.map((e: any) => (
              <>
                <b>{e.name}</b>,
              </>
            ))}
          </ul> */}
            {!data.extra ? (
              <>
                {data.employees.length > 0 ? (
                  <Text strong title={`Employees:\n${data.employees.map((e: any) => `${e.name}\n`)}`}>
                    {data.employees[0].name}
                    {data.employees.length > 1 ? <Text type="secondary"> +{data.employees.length - 1}</Text> : <></>}
                  </Text>
                ) : (
                  <Text type="secondary" strong italic>
                    Vacant
                  </Text>
                )}
                <br />
                Dept. ID: {data.department?.id}
                <br />
                Position: {data.id}
              </>
            ) : (
              <>
                <div>
                  <span
                    style={{
                      height: '8px',
                      width: '8px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      backgroundColor: '#722ED1',
                    }}
                  />{' '}
                  In review
                </div>
                <div>Submitted by: {data.submittedBy}</div>
              </>
            )}

            {selectedNode?.id === data.id && !disableCreateNewPosition && !allowSelection && (
              <Popover
                rootClassName="createButtonPopOver"
                overlayStyle={popoverStyle}
                getPopupContainer={() => cardRef.current || document.body}
                overlayInnerStyle={{ padding: 0 }}
                open={isPopoverVisible}
                placement="bottom"
                trigger="click"
                content={() => {
                  // console.log(data.employees);

                  return (
                    <Button
                      type="default"
                      onClick={createDirectReport}
                      icon={<UserAddOutlined />}
                      data-testid="create-direct-report-button"
                    >
                      Create new direct report
                    </Button>
                  );
                }}
              ></Popover>
            )}
            {selectedNode?.id === data.id && allowSelection && (
              <div
                style={{
                  background: '#f3f3f3',
                  textAlign: 'center',
                  margin: '10px -12px -12px -12px',
                  borderRadius: '0px 0px 8px 8px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
              >
                <CheckCircleFilled style={{ color: '#52C41A' }}></CheckCircleFilled> Selected
              </div>
            )}
          </Card>
          {/* </Popover> */}
        </div>

        <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </>
    );
  },
);
