import { Button, Space, Switch } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface WizardEditControlBarProps {
  onSave?: () => void;
  onNext?: () => void;
  onBack?: () => void;
  showChooseDifferentProfile?: boolean;
  style?: CSSProperties;
  nextText?: string;
  onToggleShowDiff?: (checked: boolean) => void;
  showDiffToggle?: boolean;
  showDiff?: boolean;
  isValid?: boolean;
}

const WizardEditControlBar: React.FC<WizardEditControlBarProps> = ({
  onSave,
  style,
  onNext,
  nextText,
  onBack,
  showChooseDifferentProfile,
  onToggleShowDiff,
  showDiffToggle,
  showDiff,
  isValid = true,
}) => {
  const buttonPlaceholder = <div style={{ display: 'inline-block', width: '68px' }} />;

  return (
    <div style={{ ...style, padding: '16px', background: '#f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
      <Space>
        {showDiffToggle && onToggleShowDiff ? (
          <Switch
            checked={showDiff}
            checkedChildren="Diff On"
            unCheckedChildren="Diff Off"
            onChange={onToggleShowDiff}
          />
        ) : null}
        {buttonPlaceholder}
      </Space>
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
            <Button type="primary" onClick={onNext} disabled={!isValid}>
              {nextText ? nextText : 'Next'}
            </Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default WizardEditControlBar;
