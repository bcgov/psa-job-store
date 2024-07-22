import { Radio } from 'antd';
import React from 'react';

interface ViewToggleProps {
  view: 'chart' | 'tree';
  onToggle: (view: 'chart' | 'tree') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onToggle }) => {
  return (
    <Radio.Group value={view} onChange={(e) => onToggle(e.target.value)}>
      <Radio.Button value="chart">Chart</Radio.Button>
      <Radio.Button value="tree">Tree</Radio.Button>
    </Radio.Group>
  );
};

export default ViewToggle;
