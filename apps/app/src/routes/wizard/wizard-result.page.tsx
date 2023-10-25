import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';

export const WizardResultPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <WizardPageWrapper title="Result" subTitle="Find out the result of your request">
      <WizardSteps current={3}></WizardSteps>
      <Result
        status="success"
        title="Your position has been created."
        subTitle={
          <div>
            <div>Position: Program Assistant (L9)</div>
            <br />
            <div>Position #: 12345678</div>
            <br />
            <div>We have submitted a hiring request for this position. A recruiter will reach out to you shortly.</div>
          </div>
        }
        extra={[
          <Button type="primary" key="console" onClick={handleClick}>
            Go to Dashboard
          </Button>,
        ]}
      />
    </WizardPageWrapper>
  );
};
