import { Col, Row, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import './wizard-steps.component.css';

interface WizardStepsProps {
  current: number; // Define the current prop as a number
  xl?: number;
  highlightEdit?: boolean;
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ current, highlightEdit, xl = 14 }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [stepsDirection, setStepsDirection] = useState<'horizontal' | 'vertical'>('horizontal');

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

  return (
    <Row justify="center">
      <Col xs={24} md={24} xl={xl}>
        <Steps
          responsive={false}
          direction={stepsDirection}
          progressDot={(dot, { index }) => {
            if (index == 2 && highlightEdit)
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
          className="custom-steps"
          style={{ marginBottom: '1rem' }}
          current={current}
          items={[
            {
              title: current == 0 ? <h2>Organization chart</h2> : 'Organization chart',
              description: 'Choose the supervisor',
            },
            {
              title: current == 1 ? <h2>Choose profile</h2> : 'Choose profile',
              description: 'Choose the right job profile',
            },
            {
              title: current == 2 ? <h2>Edit</h2> : 'Edit',
              description: 'Make changes if needed',
            },
            {
              title: current == 3 ? <h2>Review</h2> : 'Review',
              description: 'Review the job profile',
            },
            {
              title: current == 4 ? <h2>Additional details</h2> : 'Additional details',
              description: 'Provide additional info',
            },
            {
              title: current == 5 ? <h2>Actions</h2> : 'Actions',
              description: 'Get position number',
            },
          ]}
        />
      </Col>
    </Row>
  );
};
