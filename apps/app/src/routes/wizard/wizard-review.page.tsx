import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardControls from './components/wizard-controls.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

export const WizardReviewPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    return false;
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/wizard/result');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { wizardData } = useWizardContext();

  return (
    <WizardPageWrapper title="Review and submit" subTitle="Review the profile before creating a new position">
      <WizardSteps current={2}></WizardSteps>
      <JobProfile profileData={wizardData} />
      <WizardControls submitText={'Create Position'} onNextClick={showModal} />.
      <Modal
        title="Affirmation"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Review details again
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Create Position
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <ExclamationCircleOutlined style={{ color: 'orange', fontSize: '24px', marginRight: '16px' }} />
          <div>
            <p>By clicking “Create Position” I affirm that:</p>
            <ul>
              <li>
                The reporting relationship, job accountabilities, and scope of work reflected in this job profile is the
                actual work performed of the position(s).
              </li>
              <li>I will be accountable for risks and decisions.</li>
              <li>I will respond to audits in a timely manner.</li>
              <li>I will abide by Public Service Act.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </WizardPageWrapper>
  );
};
