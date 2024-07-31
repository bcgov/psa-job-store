import { Radio } from 'antd';
import React from 'react';

interface ViewToggleProps {
  view: 'chart' | 'tree';
  onToggle: (view: 'chart' | 'tree') => void;
  size?: 'small' | 'middle' | 'large';
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onToggle, size = 'middle' }) => {
  return (
    <Radio.Group value={view} onChange={(e) => onToggle(e.target.value)} size={size}>
      <Radio.Button value="chart">Chart</Radio.Button>
      <Radio.Button value="tree">Tree</Radio.Button>
    </Radio.Group>
  );
};

export default ViewToggle;
