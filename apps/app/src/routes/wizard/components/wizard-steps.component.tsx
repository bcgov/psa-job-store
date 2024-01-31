import { Col, Row, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import './wizard-steps.component.css';

interface WizardStepsProps {
  current: number; // Define the current prop as a number
  xl?: number;
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ current, xl = 14 }) => {
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
          progressDot
          className="custom-steps"
          style={{ marginBottom: '1rem' }}
          current={current}
          items={[
            {
              title: 'Organization chart',
              description: 'Choose the supervisor',
            },
            {
              title: 'Choose a job profile',
              description: 'Choose and modify a job profile',
            },
            {
              title: 'Edit',
              description: 'Make changes to the job profile',
            },
            {
              title: 'Review',
              description: 'Review the job profile',
            },
            {
              title: 'Confirm details',
              description: 'Provide additional info',
            },
            {
              title: 'Actions',
              description: 'Get position number',
            },
          ]}
        />
      </Col>
    </Row>
  );
};
