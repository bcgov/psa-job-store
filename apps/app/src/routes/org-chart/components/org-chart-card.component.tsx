/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popover, Row, Typography } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Connection, Edge, Handle, NodeProps, Position } from 'reactflow';

const { Text } = Typography;

// const targetHandleStyle: CSSProperties = { background: '#555' };
// const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
// const sourceHandleStyleB: CSSProperties = {
//   ...targetHandleStyle,
//   bottom: 10,
//   top: 'auto',
// };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

export const OrgChartCard = memo(({ data, isConnectable }: NodeProps) => {
  // const onStart = useCallback((viewport: Viewport) => console.log('onStart', viewport), []);
  // const onChange = useCallback((viewport: Viewport) => console.log('onChange', viewport), []);
  // const onEnd = useCallback((viewport: Viewport) => console.log('onEnd', viewport), []);

  // useOnViewportChange({
  //   onStart,
  //   onChange,
  //   onEnd,
  // });

  return (
    <>
      <Handle type="target" position={Position.Top} onConnect={onConnect} />
      <Popover
        placement="bottom"
        trigger="click"
        content={() => {
          console.log(data.employees);

          return (
            <Link to="/wizard">
              <Button type="default" icon={<PlusOutlined />}>
                Create a New Position
              </Button>
            </Link>
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
          Dept. ID: {data.department.id}
          <br />
          Position: {data.id}
        </Card>
      </Popover>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </>
  );
});
