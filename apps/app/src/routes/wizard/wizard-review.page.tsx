import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateJobProfileInput,
  JobProfileModel,
  useCreateJobProfileMutation,
} from '../../redux/services/graphql-api/job-profile.api';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardControls from './components/wizard-controls.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

function transformJobProfileDataForCreation(inputData: JobProfileModel): CreateJobProfileInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { behavioural_competencies, classification, id, ministry_id, family_id, ...rest } = inputData;

  // Exclude 'id' from the rest spread as it's not part of CreateJobProfileInput

  // Map behavioural competencies if they exist
  const behaviouralCompetenciesInput = behavioural_competencies?.length
    ? {
        create: behavioural_competencies.map(({ behavioural_competency: { id } }) => ({
          behavioural_competency: { connect: { id } },
        })),
      }
    : undefined;

  // Connect classification if it exists
  const classificationConnectInput = classification?.id
    ? { connect: { id: classification.id } }
    : { connect: { id: -1 } };

  // Construct the result with the correct type and provide default values or handle them as required by the API
  const result: CreateJobProfileInput = {
    ...rest,
    behavioural_competencies: behaviouralCompetenciesInput,
    classification: classificationConnectInput,
    state: 'SUBMITTED',
    parent: { connect: { id: id } },
  };

  return result;
}

export const WizardReviewPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createJobProfile] = useCreateJobProfileMutation();

  const showModal = () => {
    setIsModalVisible(true);
    return false;
  };

  const handleOk = async () => {
    // User pressed next on the review screen
    // A modal appeared with terms
    // User confirmed the terms in the modal by pressing OK

    // Hide the modal
    setIsModalVisible(false);

    if (wizardData != null) {
      // console.log('review wizard data: ', wizardData);

      // Convert form data into API data format
      // e.g. remove references such as "required_accountabilities.0"
      // const transformedData = transformFormData(wizardData);
      const createInput = wizardData; // as unknown as CreateJobProfileInputPreTransform;
      const inpt = transformJobProfileDataForCreation(createInput);
      // console.log('createInput: ', inpt);
      await createJobProfile(inpt);
    }
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
