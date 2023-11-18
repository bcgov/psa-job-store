import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateJobProfileInput,
  JobProfileModel,
  useCreateJobProfileMutation,
} from '../../redux/services/graphql-api/job-profile.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';
const { Text } = Typography;

function transformJobProfileDataForCreation(inputData: JobProfileModel): CreateJobProfileInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { behavioural_competencies, classification, id, organization_id, family_id, ...rest } = inputData;

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
    : { connect: { id: '-1' } };

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

export const WizardConfirmDetailsPage = () => {
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
  const onBack = () => {
    navigate(-1);
  };

  return (
    <WizardPageWrapper
      title="Review and submit"
      subTitle="Review the profile before creating a new position"
      xxl={14}
      xl={18}
    >
      <WizardSteps current={3} xl={24}></WizardSteps>
      <WizardEditControlBar
        style={{ marginBottom: '1rem' }}
        onNext={showModal}
        onBack={onBack}
        nextText="Submit for a new position #"
      />

      <Card
        style={{
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          borderRadius: '10px',
        }}
      >
        <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }} />
        <br></br>
        <Text type="secondary">We will ask you for some additional information on this page in the future.</Text>
      </Card>

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
