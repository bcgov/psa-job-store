import { Radio } from 'antd';
import React from 'react';

interface ViewToggleProps {
  view: 'chart' | 'tree';
  onToggle: (view: 'chart' | 'tree') => void;
  size?: 'small' | 'middle' | 'large';
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onToggle, size = 'middle' }) => {
  return (
    <div>
      <label id="view-toggle-label" className="sr-only">
        Select organization chart view type
      </label>
      <p id="view-toggle-description" className="sr-only">
        Tree view is keyboard navigable. This switch controls the type of organization chart being displayed.
      </p>
      <Radio.Group
        value={view}
        onChange={(e) => onToggle(e.target.value)}
        size={size}
        aria-labelledby="view-toggle-label"
        aria-describedby="view-toggle-description"
      >
        <Radio.Button value="chart" tabIndex={0}>
          Chart
          <span className="sr-only">view</span>
        </Radio.Button>
        <Radio.Button value="tree" tabIndex={-1}>
          Tree
          <span className="sr-only">view (keyboard navigable)</span>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default ViewToggle;
