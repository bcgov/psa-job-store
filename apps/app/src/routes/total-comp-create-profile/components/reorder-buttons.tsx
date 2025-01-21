import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

type ReorderButtonsProps = {
  index: number;
  moveItem: (index: number, direction: 'up' | 'down') => void;
  upperDisabled: boolean;
  lowerDisabled: boolean;
};

const ReorderButtons: React.FC<ReorderButtonsProps> = ({ index, moveItem, upperDisabled, lowerDisabled }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.15)',
      }}
    >
      <Button
        disabled={upperDisabled}
        style={{
          border: 'none',
          borderBottom: '1px solid #d9d9d9',
          borderRadius: 0,
          padding: '3px',
          height: 'auto',
        }}
        icon={<CaretUpFilled />}
        aria-label="Move up"
        onClick={() => moveItem(index, 'up')}
      />
      <Button
        disabled={lowerDisabled}
        style={{
          border: 'none',
          borderRadius: 0,
          padding: '3px',
          height: 'auto',
        }}
        icon={<CaretDownFilled />}
        aria-label="Move down"
        onClick={() => moveItem(index, 'down')}
      />
    </div>
  );
};

export default ReorderButtons;
