import { Button, Space, Switch } from 'antd';
import React, { CSSProperties } from 'react';
import { useUpdatePositionRequestMutation } from '../../../redux/services/graphql-api/position-request.api';
import './wizard-edit-control-bar.css';
import { useWizardContext } from './wizard.provider';

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
  showNext?: boolean;
  onChooseDifferentProfile?: () => void;
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
  showNext = true,
  onChooseDifferentProfile,
}) => {
  const buttonPlaceholder = <div style={{ display: 'inline-block', width: '68px' }} />;
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestId } = useWizardContext();

  const chooseDifferentProfile = async () => {
    if (positionRequestId) await updatePositionRequest({ id: positionRequestId, step: 1 }).unwrap();
    if (onChooseDifferentProfile) onChooseDifferentProfile();
  };

  return (
    <div className="wizard-edit-control-bar" style={{ ...style }} id="wizardEditControlBar">
      <Space>
        {showDiffToggle && onToggleShowDiff ? (
          <Space direction="horizontal">
            <span>Show changes:</span>
            <Switch
              aria-label="Toggle show changes"
              data-testid="toggleDiffSwitch"
              checked={showDiff}
              checkedChildren="On"
              unCheckedChildren="Off"
              onChange={onToggleShowDiff}
            />
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
              <Button onClick={chooseDifferentProfile} type="primary">
                Choose different profile
              </Button>
            ) : null}
            {onBack ? <Button onClick={onBack}>Back</Button> : null}
            {showNext && (
              <Button type="primary" onClick={onNext}>
                {nextText ? nextText : 'Next'}
              </Button>
            )}
            {showDiffToggle && (
              <>
                <p style={{ margin: 0 }}>
                  <b>Changes legend: </b>
                  <span style={{ textDecoration: 'line-through', color: '#A8071A' }}>Strikethrough</span> means removed
                  text. <span style={{ backgroundColor: 'yellow' }}>Highlighted text</span> means added text.
                </p>
              </>
            )}
          </>
        )}
      </Space>
    </div>
  );
};

export default WizardEditControlBar;
