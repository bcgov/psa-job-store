/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popover, Row, Typography } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connection, Edge, Handle, NodeProps, Position } from 'reactflow';
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

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

export const OrgChartCard = memo(
  ({
    data,
    isConnectable,
    selectedDepartment,
    onCreateNewPosition,
  }: NodeProps & { selectedDepartment: string | null; onCreateNewPosition: () => void | null }) => {
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

    const createNewPosition = async () => {
      // we are not editing a draft position request (creatign position from dashboard or from org chart page)
      if (!location.pathname.startsWith('/position-request/')) {
        const positionRequestInput = {
          step: 1,
          title: 'Untitled',
          reports_to_position_id: reportingPositionId,
          department: { connect: { id: selectedDepartment ?? '' } },
        };
        // 'CreatePositionRequestInput': profile_json, parent_job_profile, title, classification_code
        const resp = await createPositionRequest(positionRequestInput).unwrap();
        setPositionRequestId(resp.createPositionRequest);
        navigate(`/position-request/${resp.createPositionRequest}`, { replace: true });
      } else {
        console.log('updating position request.. ', positionRequestId, selectedDepartment);
        // we are editing a draft position request - update existing position request
        if (positionRequestId != null && selectedDepartment != null) {
          await updatePositionRequest({
            id: positionRequestId,
            step: 1,
            reports_to_position_id: reportingPositionId,
            department: { connect: { id: selectedDepartment } },
          }).unwrap();
        }
      }
      if (onCreateNewPosition) onCreateNewPosition();
    };

    return (
      <>
        <Handle type="target" position={Position.Top} onConnect={onConnect} />
        <Popover
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
            title={
              <Row style={{ width: '100%' }} gutter={8}>
                <Col span={18}>
                  <Text ellipsis>{data.title}</Text>
                </Col>
                <Col span={6}>
                  <Text ellipsis>{data.classification?.code}</Text>
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
          </Card>
        </Popover>

        <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </>
    );
  },
);
