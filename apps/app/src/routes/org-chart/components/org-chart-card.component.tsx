/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popover, Row, Typography } from 'antd';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connection, Edge, Handle, Node, NodeProps, Position, useOnSelectionChange } from 'reactflow';
import {
  useCreatePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../../redux/services/graphql-api/position-request.api';
import { useWizardContext } from '../../wizard/components/wizard.provider';

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
  }: NodeProps & {
    selectedDepartment: string | null;
    onCreateNewPosition: () => void | null;
    orgChartData: { nodes: Node[]; edges: Edge[] };
    selectChangeCallback?: (nodes: Node[]) => void;
    selectedNode?: Node | null;
    incomerIds?: string[];
    outgoerIds?: string[];
    disableCreateNewPosition?: boolean;
  }) => {
    // const onStart = useCallback((viewport: Viewport) => console.log('onStart', viewport), []);
    // const onChange = useCallback((viewport: Viewport) => console.log('onChange', viewport), []);
    // const onEnd = useCallback((viewport: Viewport) => console.log('onEnd', viewport), []);

    // useOnViewportChange({
    //   onStart,
    //   onChange,
    //   onEnd,
    // });
    const { setPositionRequestId, positionRequestId } = useWizardContext();
    const reportingPositionId = data.id;
    const [createPositionRequest] = useCreatePositionRequestMutation();
    const [updatePositionRequest] = useUpdatePositionRequestMutation();

    const navigate = useNavigate();
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

    const createNewPosition = async () => {
      // we are not editing a draft position request (creatign position from dashboard or from org chart page)
      // console.log('orgChartData: ', orgChartData);

      if (!location.pathname.startsWith('/position-request/')) {
        const positionRequestInput = {
          step: 1,
          title: 'Untitled',
          reports_to_position_id: reportingPositionId,
          department: { connect: { id: selectedDepartment ?? '' } },
          orgchart_json: orgChartData,
        };
        // 'CreatePositionRequestInput': profile_json, parent_job_profile, title, classification_code
        const resp = await createPositionRequest(positionRequestInput).unwrap();
        setPositionRequestId(resp.createPositionRequest);
        navigate(`/position-request/${resp.createPositionRequest}`, { replace: true });
      } else {
        // we are editing a draft position request - update existing position request
        if (positionRequestId != null && selectedDepartment != null) {
          await updatePositionRequest({
            id: positionRequestId,
            step: 1,
            reports_to_position_id: reportingPositionId,
            department: { connect: { id: selectedDepartment } },
            orgchart_json: orgChartData,
          }).unwrap();
        }
      }
      if (onCreateNewPosition) onCreateNewPosition();
    };

    const isNodeSelected = selectedNode?.id === data.id;
    const isNodeIncomer = incomerIds?.includes(data.id);
    const isNodeOutgoer = outgoerIds?.includes(data.id);

    // Define header styling based on node status
    let headerStyle = {};
    if (isNodeSelected) {
      headerStyle = {
        backgroundColor: 'purple',
        color: 'white',
      };
    } else if (isNodeIncomer || isNodeOutgoer) {
      headerStyle = {
        backgroundColor: '#036', // Example color for incomers and outgoers
        color: 'white',
      };
    }

    // if (data.id == 'xxxxx') console.log('isPopoverVisible: ', isPopoverVisible, 'selectedNode: ', selectedNode);

    if (data.extra) {
      console.log('data.extra: ', data);
    }
    return (
      <>
        <Handle type="target" position={Position.Top} onConnect={onConnect} />
        <Popover
          open={isPopoverVisible}
          placement="bottom"
          trigger="click"
          content={() => {
            // console.log(data.employees);

            return (
              <Button type="default" onClick={createNewPosition} icon={<PlusOutlined />}>
                Create a New Position
              </Button>
            );
          }}
        >
          <Card
            size="small"
            style={{ border: '1px solid #A1A1A1', cursor: 'pointer' }}
            headStyle={{ ...headerStyle }}
            title={
              <Row style={{ width: '100%' }} gutter={8}>
                <Col span={18}>
                  <Text ellipsis style={{ ...headerStyle }}>
                    {data.title}
                  </Text>
                </Col>
                <Col span={6}>
                  <Text ellipsis style={{ ...headerStyle }}>
                    {data.classification?.code}
                  </Text>
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
          </Card>
        </Popover>

        <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </>
    );
  },
);
