import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateJobProfileInput,
  JobProfileModel,
  TrackedFieldArrayItem,
} from '../../redux/services/graphql-api/job-profile-types';
import { useCreateJobProfileMutation } from '../../redux/services/graphql-api/job-profile.api';
import { useUpdatePositionRequestMutation } from '../../redux/services/graphql-api/position-request.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';
const { Text } = Typography;

function transformJobProfileDataForCreation(inputData: JobProfileModel): CreateJobProfileInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { behavioural_competencies, classification, id, organization_id, family_id, ...rest } = inputData;

  const title = typeof inputData.title === 'string' ? inputData.title : inputData.title.value;
  const overview = typeof inputData.overview === 'string' ? inputData.overview : inputData.overview.value;

  const requiredAccountabilities = inputData.accountabilities.required
    .filter((item): item is TrackedFieldArrayItem => typeof item !== 'string' && !item.disabled)
    .map((item) => item.value);

  const optionalAccountabilities = inputData.accountabilities.optional
    .filter((item): item is TrackedFieldArrayItem => typeof item !== 'string' && !item.disabled)
    .map((item) => item.value);

  const requirements = inputData.requirements
    .filter((item): item is TrackedFieldArrayItem => typeof item !== 'string' && !item.disabled)
    .map((item) => item.value);

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
    overview: overview,
    title: title,
    requirements: requirements,
    accountabilities: {
      optional: optionalAccountabilities,
      required: requiredAccountabilities,
    },
    behavioural_competencies: behaviouralCompetenciesInput,
    classification: classificationConnectInput,
    state: 'DRAFT',
    parent: { connect: { id: id } },
  };

  return result;
}

export const WizardConfirmDetailsPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createJobProfile] = useCreateJobProfileMutation();
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestId } = useWizardContext();

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

    try {
      if (positionRequestId) {
        await updatePositionRequest({
          id: positionRequestId,
          step: 3,
          status: 'COMPLETED',
          position_number: 123456,
        }).unwrap();
        navigate('/wizard/result');
      } else {
        throw Error('Position request not found');
      }
    } catch (error) {
      // Handle the error, possibly showing another modal
      Modal.error({
        title: 'Error Creating Position',
        content: 'An unknown error occurred', //error.data?.message ||
      });
    }
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
                I confirm this Statement of Job Responsibilities accurately reflects the actual work to be performed of
                the position(s) as outlined in{' '}
                <a
                  target="_blank"
                  href="https://www2.gov.bc.ca/assets/gov/careers/managers-supervisors/managing-employee-labour-relations/hr-policy-pdf-documents/06_job_evaluation_policy.pdf"
                >
                  Human Resources Policy 06 – Job Evaluation
                </a>
                , and
              </li>
              <li>
                I confirm the accountabilities are not similar to the supervisor, peer, or management positions within
                the work unit, and
              </li>
              <li>
                As the excluded manager or delegate, I confirm the job role, accountabilities, and scope of
                responsibility are true and accurate, and in establishing this position (s), I confirm the content I
                assume all risks related to this decision.{' '}
              </li>
              <li>I will respond to audits in a timely manner.</li>
              <li>
                I will abide by the Public Service Act and all Human Resources policies for hiring decisions related to
                this position.
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </WizardPageWrapper>
  );
};
