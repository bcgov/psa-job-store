/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Col, FormInstance, List, Menu, Modal, Popover, Row, Typography } from 'antd';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import { ClassificationModel, JobProfileModel } from '../../redux/services/graphql-api/job-profile-types';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditProfile from './components/wizard-edit-profile';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';

export interface InputData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface WizardEditPageProps {
  onBack?: () => void;
  onNext?: () => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
}

export const WizardEditPage: React.FC<WizardEditPageProps> = ({
  onBack,
  onNext,
  disableBlockingAndNavigateHome,
  positionRequest,
  setCurrentStep,
}) => {
  // "wizardData" may be the data that was already saved in context. This is used to support "back" button
  // functionality from the review screen (so that form contains data the user has previously entered)
  const {
    wizardData,
    setWizardData,
    classificationsData,
    positionRequestProfileId,
    positionRequestId,
    setRequiresVerification,
  } = useWizardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBack, setIsLoadingBack] = useState(false);
  const [saveAndQuitLoading, setSaveAndQuitLoading] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);

  const handleFormChange = () => {
    setIsFormModified(true);
  };

  const [updatePositionRequest] = useUpdatePositionRequestMutation();

  const profileId = positionRequestProfileId;

  function getClassificationById(id: string): ClassificationModel | undefined {
    // If data is loaded, find the classification by ID
    if (classificationsData) {
      return classificationsData.classifications.find(
        (classification: ClassificationModel) => classification.id === id,
      );
    }
    return;
  }

  function transformFormData(originalData: any): JobProfileModel {
    return {
      id: originalData.id,
      type: 'USER',
      title: originalData.title,
      number: originalData.number,
      organization_id: '-1',
      jobFamilies: [],
      streams: [],
      context: originalData.context,
      overview: originalData.overview,
      program_overview: originalData.program_overview,
      accountabilities: [...originalData.accountabilities, ...originalData.optional_accountabilities]
        .map((acc) => ({
          text: acc.text,
          is_significant: acc.is_significant,
          is_readonly: acc.is_readonly,
          isCustom: acc.isCustom,
          disabled: acc.disabled,
        }))
        .filter((acc) => acc.text.trim() !== ''),
      education: originalData.education.filter((edu: { text: string }) => edu.text.trim() !== ''),
      job_experience: originalData.job_experience.filter((exp: { text: string }) => exp.text.trim() !== ''),
      behavioural_competencies: originalData.behavioural_competencies,
      classifications: originalData.classifications.map((classification: any) => ({
        classification: getClassificationById(classification.classification),
      })),
      role: { id: originalData.roleId || null },
      role_type: { id: originalData.roleTypeId || null },
      scopes: [], //{ id: originalData.scopeId || null },
      reports_to: [],
      organizations: [],
      review_required: false,
      professions: [],
      professional_registration_requirements: originalData.professional_registration_requirements.filter(
        (reg: { text: string }) => reg.text.trim() !== '',
      ),
      optional_requirements: originalData.optional_requirements.filter(
        (req: { text: string }) => req.text.trim() !== '',
      ),
      preferences: originalData.preferences.filter((pref: { text: string }) => pref.text.trim() !== ''),
      knowledge_skills_abilities: originalData.knowledge_skills_abilities.filter(
        (ksa: { text: string }) => ksa.text.trim() !== '',
      ),
      willingness_statements: originalData.willingness_statements
        .map((proviso: any) => ({
          text: proviso.text,
          isCustom: proviso.isCustom,
          disabled: proviso.disabled,
        }))
        .filter((stmt: { text: string }) => stmt.text.trim() !== ''),
      security_screenings: originalData.security_screenings.filter(
        (screening: { text: string }) => screening.text.trim() !== '',
      ),
      all_organizations: false,
      all_reports_to: false,
    };
  }

  const wizardEditProfileRef = useRef<{
    submit: () => void;
    getFormData: () => ReturnType<FormInstance['getFieldsValue']>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFormErrors: () => any;
  }>(null);

  // const navigate = useNavigate();

  const saveData = async (action: string, step?: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors = Object.values(wizardEditProfileRef.current?.getFormErrors()).map((error: any) => {
      const message =
        error.message != null
          ? error.message
          : error.root != null
            ? error.root?.message
            : error.text != null
              ? error.text.message
              : 'Error';
      return message;
    });

    if (errors.length && action == 'next') {
      Modal.error({
        title: 'Errors',
        content: (
          <List>
            {errors.map((message, index) => (
              <List.Item>
                <p key={index}>{message}</p>
              </List.Item>
            ))}
          </List>
        ),
      });
      return;
    }

    if (action === 'next') setIsLoading(true);
    else if (action == 'back') setIsLoadingBack(true);
    else setSaveAndQuitLoading(true);

    try {
      // Create an entry in My Position Requests

      const formData = wizardEditProfileRef.current?.getFormData();
      // console.log('formData: ', formData);

      const transformedData = transformFormData(formData);
      // console.log('transformedData: ', transformedData);

      // return;

      setWizardData(transformedData);
      try {
        if (positionRequestId)
          await updatePositionRequest({
            id: positionRequestId,
            step: !step && step != 0 ? (action === 'next' ? 3 : action === 'back' ? 1 : 2) : step,
            // increment max step only if it's not incremented
            ...(action === 'next' && positionRequest?.max_step_completed != 3 && !step && step != 0
              ? { max_step_completed: 3 }
              : {}),
            profile_json_updated: transformedData,
            title: formData.title.text,
            // classification_code: classification ? classification.code : '',
          }).unwrap();
      } catch (error) {
        // Handle the error, possibly showing another modal
        Modal.error({
          title: 'Error updating position',
          content: 'An unknown error occurred', //error.data?.message ||
        });
        return false;
      }

      if (action === 'next') {
        if (step || step == 0) setCurrentStep(step);
        else if (onNext) onNext();
      } else if (action === 'back') {
        if (onBack) {
          // console.log('onback');
          onBack();
        }
      }
      return true;
    } catch (e) {
      // throw e;
      return false;
    } finally {
      if (action === 'next') setIsLoading(false);
      else if (action === 'back') setIsLoadingBack(false);
      else setSaveAndQuitLoading(false);
    }
  };

  const onNextCallback = async ({ step }: { step?: number } = {}) => {
    await saveData('next', step);
  };

  const onBackCallback = async () => {
    await saveData('back');
  };

  // console.log('wizardData: ', wizardData);

  // todo: refactor this into WizardPageWrapper component

  const [deletePositionRequest] = useDeletePositionRequestMutation();
  const deleteRequest = async () => {
    if (!positionRequestId) return;
    Modal.confirm({
      title: 'Delete Position Request',
      content: 'Do you want to delete the position request?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        await deletePositionRequest({ id: positionRequestId });
        disableBlockingAndNavigateHome();
      },
    });
  };

  const saveAndQuit = async () => {
    // console.log('disableBlockingAndNavigateHome');
    await saveData('stay');
    disableBlockingAndNavigateHome();
  };

  const getMenuContent = () => {
    return (
      <Menu>
        <Menu.Item key="save" onClick={saveAndQuit} disabled={saveAndQuitLoading}>
          <div style={{ position: 'relative' }}>
            {saveAndQuitLoading && (
              <div style={{ position: 'absolute', top: '0', height: '100%', width: '100%', background: '#ffffffa8' }}>
                <div style={{ margin: 'auto', display: 'block', marginTop: '13px', textAlign: 'center' }}>
                  <LoadingComponent mode="small"></LoadingComponent>
                </div>
              </div>
            )}

            <div style={{ padding: '5px 0' }}>
              Save and quit
              <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                Saves your progress. You can access this position request from the 'My Position Requests' page.
              </Typography.Text>
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.ItemGroup key="others" title={<b>Others</b>}>
          <Menu.Item key="delete" onClick={deleteRequest}>
            <div style={{ padding: '5px 0' }}>
              Delete
              <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                Removes this position request from 'My Position Requests'. This action is irreversible.
              </Typography.Text>
            </div>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  };

  const switchStep = async (step: number) => {
    if (isFormModified) {
      Modal.confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Do you want to save them before switching steps?',
        okText: 'Save',
        cancelText: 'Cancel',
        onOk: async () => {
          onNextCallback({ step: step });
          setIsFormModified(false);
        },
        onCancel: () => {
          // Do nothing if the user cancels
        },
      });
    } else {
      setCurrentStep(step);
      if (positionRequestId)
        await updatePositionRequest({
          id: positionRequestId,
          step: step,
        });
    }
  };

  return (
    <WizardPageWrapper
      title={
        <div>
          <Link to="/" aria-label="Go to dashboard">
            <ArrowLeftOutlined aria-hidden style={{ color: 'black', marginRight: '1rem' }} />
          </Link>
          {positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position'}
        </div>
      }
      subTitle={<div>You may now edit the profile.</div>}
      additionalBreadcrumb={{
        title: positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
      }}
      hpad={false}
      grayBg={false}
      pageHeaderExtra={[
        <div style={{ marginRight: '1rem' }}>
          <StatusIndicator status={positionRequest?.status ?? ''} />
        </div>,
        <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
          <Button icon={<EllipsisOutlined />}></Button>
        </Popover>,
        <Button onClick={onBackCallback} key="back" data-testid="back-button" loading={isLoadingBack}>
          Back
        </Button>,
        <Button
          key="next"
          type="primary"
          onClick={() => {
            onNextCallback();
          }}
          data-testid="next-button"
          loading={isLoading}
        >
          Save and next
        </Button>,
      ]}
    >
      <WizardSteps
        current={2}
        onStepClick={switchStep}
        maxStepCompleted={positionRequest?.max_step_completed}
      ></WizardSteps>
      {/* <WizardEditControlBar
        style={{ marginBottom: '1rem' }}
        onNext={onNextCallback}
        onChooseDifferentProfile={onBack}
        showChooseDifferentProfile={true}
        nextText="Save and Next"
      /> */}

      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          background: 'rgb(240, 242, 245)',
          marginLeft: '-1rem',
          marginRight: '-1rem',
          marginTop: '-1px',
          padding: '2rem 1rem',
        }}
      >
        <Row justify="center" gutter={16}>
          <Col>
            <WizardEditProfile
              onVerificationRequiredChange={setRequiresVerification}
              ref={wizardEditProfileRef}
              profileData={wizardData}
              id={profileId?.toString()}
              submitText="Review Profile"
              showBackButton={true}
              handleFormChange={handleFormChange}
            ></WizardEditProfile>
          </Col>
        </Row>
      </div>
    </WizardPageWrapper>
  );
};
