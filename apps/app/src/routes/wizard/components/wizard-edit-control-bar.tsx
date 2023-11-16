import { Button, Space } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface WizardEditControlBarProps {
  onSave?: () => void;
  onNext?: () => void;
  onBack?: () => void;
  showChooseDifferentProfile?: boolean;
  style?: CSSProperties;
  nextText?: string;
}

const WizardEditControlBar: React.FC<WizardEditControlBarProps> = ({
  onSave,
  style,
  onNext,
  nextText,
  onBack,
  showChooseDifferentProfile,
}) => {
  const buttonPlaceholder = <div style={{ display: 'inline-block', width: '68px' }} />;

  return (
    <div style={{ ...style, padding: '16px', background: '#f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
      <Space>{buttonPlaceholder}</Space>
      <Space>
        {onSave ? (
          <>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            {showChooseDifferentProfile ? (
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
