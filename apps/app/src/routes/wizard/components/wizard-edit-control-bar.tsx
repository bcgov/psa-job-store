import { Button, Space, Switch } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import './wizard-edit-control-bar.css';

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
}) => {
  const buttonPlaceholder = <div style={{ display: 'inline-block', width: '68px' }} />;

  return (
    <div className="wizard-edit-control-bar" style={{ ...style }} id="wizardEditControlBar">
      <Space>
        {showDiffToggle && onToggleShowDiff ? (
          <Space direction="horizontal">
            <span>See Changes:</span>
            <Switch checked={showDiff} checkedChildren="On" unCheckedChildren="Off" onChange={onToggleShowDiff} />
          </Space>
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
