import { Steps } from 'antd';
import React from 'react';
import './wizard-steps.component.css';

interface WizardStepsProps {
  current: number; // Define the current prop as a number
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ current }) => {
  return (
    <Steps
      progressDot
      className="custom-steps"
      style={{ marginBottom: '1rem' }}
      current={current}
      items={[
        {
          title: 'Choose a job profile',
          description: 'Choose and modify a job profile',
        },
        {
          title: 'Review/Edit',
          description: 'Make changes to the job profile',
        },
        {
          title: 'Additional Info',
          description: 'Provide additional info',
        },
      ]}
    />
  );
};
