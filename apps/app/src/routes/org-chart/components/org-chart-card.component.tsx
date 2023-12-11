/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Popover, Space, Typography } from 'antd';
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

  console.log('data: ', data);

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
            <Space>
              <Text ellipsis>
                {data.title} {data.classification?.code}
              </Text>
            </Space>
          }
        >
          Employee: {data.employees.length}
          <br />
          Employees:
          <ul>
            {data.employees.map((e: any) => (
              <>
                <b>{e.name}</b>,
              </>
            ))}
          </ul>
          Position: {data.id}
        </Card>
      </Popover>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </>
  );
});
