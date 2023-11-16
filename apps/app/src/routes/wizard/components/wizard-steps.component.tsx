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
          title: 'Submission Result',
          description: 'Find out the result of your request',
        },
      ]}
    />
  );
};
