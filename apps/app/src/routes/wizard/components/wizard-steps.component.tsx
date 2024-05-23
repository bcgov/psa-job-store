import { Col, Row, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import './wizard-steps.component.css';
import { useWizardContext } from './wizard.provider';

interface WizardStepsProps {
  current: number; // Define the current prop as a number
  xl?: number;
  maxStepCompleted?: number;
  onStepClick: (step: number) => void;
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ current, xl = 14, maxStepCompleted = 0, onStepClick }) => {
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
            if (index == 2 && requiresVerification && current >= 2)
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
          className={`custom-steps ${Array.from({ length: maxStepCompleted }, (_, i) => `max-step-${i + 1}`).join(
            ' ',
          )}`}
          style={{ marginBottom: '1rem' }}
          current={current}
          items={[
            {
              title:
                current == 0 ? (
                  <h2 className={current == 0 ? 'current' : ''}>Organization chart</h2>
                ) : (
                  'Organization chart'
                ),
              description: 'Choose the supervisor',
              onClick: () => handleStepClick(0),
              className: maxStepCompleted >= 0 && current != 0 ? 'clickable' : 'waiting',
            },
            {
              title:
                current == 1 ? <h2 className={current == 1 ? 'current' : ''}>Choose profile</h2> : 'Choose profile',
              description: 'Choose the right job profile',
              onClick: () => handleStepClick(1),
              className: maxStepCompleted >= 1 && current != 1 ? 'clickable' : 'waiting',
            },
            {
              title: current == 2 ? <h2 className={current == 2 ? 'current' : ''}>Edit</h2> : 'Edit',
              description: requiresVerification ? 'Changes will need to be verified' : 'Make changes if needed',
              onClick: () => handleStepClick(2),
              className: maxStepCompleted >= 2 && current != 2 ? 'clickable' : 'waiting',
            },
            {
              title: current == 3 ? <h2 className={current == 3 ? 'current' : ''}>Review</h2> : 'Review',
              description: 'Review the job profile',
              onClick: () => handleStepClick(3),
              className: maxStepCompleted >= 3 && current != 3 ? 'clickable' : 'waiting',
            },
            {
              title:
                current == 4 ? (
                  <h2 className={current == 4 ? 'current' : ''}>Additional details</h2>
                ) : (
                  'Additional details'
                ),
              description: 'Provide additional info',
              onClick: () => handleStepClick(4),
              className: maxStepCompleted >= 4 && current != 4 ? 'clickable' : 'waiting',
            },
            {
              title: current == 5 ? <h2 className={current == 5 ? 'current' : ''}>Actions</h2> : 'Actions',
              description: 'Get position number',
              onClick: () => handleStepClick(5),
              className: maxStepCompleted >= 5 && current != 5 ? 'clickable' : 'waiting',
            },
          ]}
        />
      </Col>
    </Row>
  );
};
