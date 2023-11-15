import { Button, Space } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface WizardEditControlBarProps {
  editMode?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onNext?: () => void;
  onBack?: () => void;
  style?: CSSProperties;
  nextText?: string;
}

const WizardEditControlBar: React.FC<WizardEditControlBarProps> = ({
  editMode,
  onEdit,
  onSave,
  onCancel,
  style,
  onNext,
  nextText,
  onBack,
}) => {
  const buttonPlaceholder = <div style={{ display: 'inline-block', width: '68px' }} />;

  return (
    <div style={{ ...style, padding: '16px', background: '#f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
      <Space>
        {onEdit ? (
          editMode ? (
            buttonPlaceholder
          ) : (
            <Button type="default" onClick={onEdit}>
              Edit
            </Button>
          )
        ) : (
          buttonPlaceholder
        )}
      </Space>
      <Space>
        {editMode ? (
          <>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            {onEdit ? (
              <Link to="/wizard">
                <Button type="primary">Choose different profile</Button>
              </Link>
            ) : null}
            {onBack ? <Button onClick={onBack}>Back</Button> : null}
            <Button type="primary" onClick={onNext}>
              {nextText ? nextText : 'Next'}
            </Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default WizardEditControlBar;
