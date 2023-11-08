/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd';
import { CSSProperties, memo } from 'react';
import { Connection, Edge, Handle, NodeProps, Position } from 'reactflow';

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
const sourceHandleStyleB: CSSProperties = {
  ...targetHandleStyle,
  bottom: 10,
  top: 'auto',
};

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
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <Card size="small">
        <p>Title</p>
        <p>Classification</p>
        <input className="" type="color" onChange={data.onChange} defaultValue={data.color} />
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={sourceHandleStyleA}
        isConnectable={isConnectable}
        onMouseDown={(e) => {
          console.log('You trigger mousedown event', e);
        }}
      />
      <Handle type="source" position={Position.Right} id="b" style={sourceHandleStyleB} isConnectable={isConnectable} />
    </>
  );
});
