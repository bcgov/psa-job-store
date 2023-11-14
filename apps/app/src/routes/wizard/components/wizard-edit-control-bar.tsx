import { Button, Space } from 'antd';
import React, { CSSProperties } from 'react';

interface WizardEditControlBarProps {
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  style?: CSSProperties;
}

const WizardEditControlBar: React.FC<WizardEditControlBarProps> = ({ editMode, onEdit, onSave, onCancel, style }) => {
  const buttonPlaceholder = <div style={{ display: 'inline-block', width: '68px' }} />;

  return (
    <div style={{ ...style, padding: '16px', background: '#f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
      <Space>
        {editMode ? (
          buttonPlaceholder
        ) : (
          <Button type="default" onClick={onEdit}>
            Edit
          </Button>
        )}
      </Space>
      <Space>
        {editMode ? (
          <>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <Button type="primary">Choose different profile</Button>
            <Button type="primary">Next</Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default WizardEditControlBar;
