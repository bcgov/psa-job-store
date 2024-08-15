import { Col, Row, Steps, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import './wizard-steps.component.css';
import { useWizardContext } from './wizard.provider';

interface WizardStepsProps {
  current: number; // Define the current prop as a number
  xl?: number;
  maxStepCompleted?: number;
  onStepClick: (step: number) => void;
  disabledTooltip?: string | null;
}

export const WizardSteps: React.FC<WizardStepsProps> = ({
  current,
  xl = 16,
  maxStepCompleted = 0,
  onStepClick,
  disabledTooltip,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [stepsDirection, setStepsDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  // get requiresVerification from useWizardContext
  const { requiresVerification } = useWizardContext();

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Change the breakpoint here as per your requirement
    const breakpoint = 853;
    setStepsDirection(screenWidth <= breakpoint ? 'vertical' : 'horizontal');

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  const handleStepClick = async (step: number) => {
    onStepClick(step);
    // if (positionRequestId)
    //   await updatePositionRequest({
    //     id: positionRequestId,
    //     step: step,
    //   });
    // setSearchParams({}, { replace: true });

    // if (step <= maxStepCompleted) {
    //   if (hasUnsavedChanges) {
    //     // Show a modal to confirm navigation when there are unsaved changes
    //     Modal.confirm({
    //       title: 'Unsaved Changes',
    //       content: 'You have unsaved changes. Do you want to proceed?',
    //       onOk: () => onStepClick?.(step),
    //       onCancel: () => {},
    //     });
    //   } else {
    //     onStepClick?.(step);
    //   }
    // }
  };

  return (
    <Row justify="center">
      <Col xs={24} md={24} xl={xl}>
        <Steps
          responsive={false}
          direction={stepsDirection}
          progressDot={(dot, { index }) => {
            if (index == 2 && requiresVerification)
              return (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#FA8C16',
                  }}
                />
              );
            return dot;
          }}
          // progressDot
          className={`custom-steps ${Array.from({ length: maxStepCompleted + 1 }, (_, i) => `max-step-${i + 1}`).join(
            ' ',
          )}`}
          style={{ marginBottom: '1rem' }}
          current={current}
          items={[
            {
              title:
                current == 0 ? (
                  <h2 className={current == 0 ? 'current' : ''}>Organization chart</h2>
                ) : current != 0 ? (
                  <span
                    aria-label="Go to step 1 of the wizard - organizational chart - select supervisor"
                    tabIndex={0}
                    role="button"
                  >
                    Organization chart
                  </span>
                ) : (
                  'Organization chart'
                ),
              description: 'Choose the supervisor',
              onClick: () => (current != 0 ? handleStepClick(0) : {}),
              className: maxStepCompleted >= 0 && current != 0 ? 'clickable' : 'waiting',
            },
            {
              title: (
                <Tooltip title={disabledTooltip && maxStepCompleted >= 1 && current != 1 ? disabledTooltip : ''}>
                  <div>
                    {current == 1 ? (
                      <h2 className={current == 1 ? 'current' : ''}>Choose profile</h2>
                    ) : maxStepCompleted >= 1 && current != 1 && !disabledTooltip ? (
                      <span aria-label="Go to step 2 of the wizard - choose profile" tabIndex={0} role="button">
                        Choose profile
                      </span>
                    ) : (
                      'Choose profile'
                    )}
                    <div className="ant-steps-item-description">Choose the right job profile</div>
                  </div>
                </Tooltip>
              ),
              onClick: () => (maxStepCompleted >= 1 && current != 1 && !disabledTooltip ? handleStepClick(1) : {}),
              className: `${maxStepCompleted >= 1 && current != 1 ? 'clickable' : 'waiting'} ${
                disabledTooltip && maxStepCompleted >= 1 && current != 1 ? 'no-click' : ''
              }`,
            },
            {
              title: (
                <Tooltip title={disabledTooltip && maxStepCompleted >= 2 && current != 2 ? disabledTooltip : ''}>
                  <div>
                    {current == 2 ? (
                      <h2 className={current == 2 ? 'current' : ''}>Edit</h2>
                    ) : maxStepCompleted >= 2 && current != 2 && !disabledTooltip ? (
                      <span
                        aria-label={`Go to step 3 of the wizard - edit profile - ${
                          requiresVerification ? 'Changes will need to be verified' : 'Make changes if needed'
                        }`}
                        tabIndex={0}
                        role="button"
                      >
                        Edit
                      </span>
                    ) : (
                      'Edit'
                    )}
                    <div className="ant-steps-item-description">
                      {requiresVerification ? 'Changes will need to be verified' : 'Make changes if needed'}
                    </div>
                  </div>
                </Tooltip>
              ),
              // title: current == 2 ? <h2 className={current == 2 ? 'current' : ''}>Edit</h2> : 'Edit',
              // description: requiresVerification ? 'Changes will need to be verified' : 'Make changes if needed',
              onClick: () => (maxStepCompleted >= 2 && current != 2 && !disabledTooltip ? handleStepClick(2) : {}),
              className: `${maxStepCompleted >= 2 && current != 2 ? 'clickable' : 'waiting'} ${
                disabledTooltip && maxStepCompleted >= 2 && current != 2 ? 'no-click' : ''
              }`,
            },
            {
              title: (
                <Tooltip title={disabledTooltip && maxStepCompleted >= 3 && current != 3 ? disabledTooltip : ''}>
                  <div>
                    {current == 3 ? (
                      <h2 className={current == 3 ? 'current' : ''}>Review</h2>
                    ) : maxStepCompleted >= 3 && current != 3 && !disabledTooltip ? (
                      <span aria-label="Go to step 4 of the wizard - review the job profile" tabIndex={0} role="button">
                        Review
                      </span>
                    ) : (
                      'Review'
                    )}
                    <div className="ant-steps-item-description">Review the job profile</div>
                  </div>
                </Tooltip>
              ),
              onClick: () => (maxStepCompleted >= 3 && current != 3 && !disabledTooltip ? handleStepClick(3) : {}),
              className: `${maxStepCompleted >= 3 && current != 3 ? 'clickable' : 'waiting'} ${
                disabledTooltip && maxStepCompleted >= 3 && current != 3 ? 'no-click' : ''
              }`,
            },
            {
              title: (
                <Tooltip title={disabledTooltip && maxStepCompleted >= 4 && current != 4 ? disabledTooltip : ''}>
                  <div>
                    {current == 4 ? (
                      <h2 className={current == 4 ? 'current' : ''}>Additional details</h2>
                    ) : maxStepCompleted >= 4 && current != 4 && !disabledTooltip ? (
                      <span
                        aria-label="Go to step 5 of the wizard - additional details - provide additional info"
                        tabIndex={0}
                        role="button"
                      >
                        Additional details
                      </span>
                    ) : (
                      'Additional details'
                    )}
                    <div className="ant-steps-item-description">Provide additional info</div>
                  </div>
                </Tooltip>
              ),
              onClick: () => (maxStepCompleted >= 4 && current != 4 && !disabledTooltip ? handleStepClick(4) : {}),
              className: `${maxStepCompleted >= 4 && current != 4 ? 'clickable' : 'waiting'} ${
                disabledTooltip && maxStepCompleted >= 4 && current != 4 ? 'no-click' : ''
              }`,
            },
            {
              title: (
                <Tooltip title={disabledTooltip && maxStepCompleted >= 5 && current != 5 ? disabledTooltip : ''}>
                  <div>
                    {current == 5 ? (
                      <h2 className={current == 5 ? 'current' : ''}>Actions</h2>
                    ) : maxStepCompleted >= 5 && current != 5 && !disabledTooltip ? (
                      <span
                        aria-label="Go to step 6 of the wizard - actions - get position number"
                        tabIndex={0}
                        role="button"
                      >
                        Actions
                      </span>
                    ) : (
                      'Actions'
                    )}
                    <div className="ant-steps-item-description">Get position number</div>
                  </div>
                </Tooltip>
              ),
              onClick: () => (maxStepCompleted >= 5 && current != 5 && !disabledTooltip ? handleStepClick(5) : {}),
              className: `${maxStepCompleted >= 5 && current != 5 ? 'clickable' : 'waiting'} ${
                disabledTooltip && maxStepCompleted >= 5 && current != 5 ? 'no-click' : ''
              }`,
            },
          ]}
        />
      </Col>
    </Row>
  );
};
