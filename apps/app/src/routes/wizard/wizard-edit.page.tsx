/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, FormInstance, List, Modal, Row } from 'antd';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { JobProfileModel } from '../../redux/services/graphql-api/job-profile-types';
import {
  GetPositionRequestResponseContent,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardContentWrapper from './components/wizard-content-wrapper';
import WizardEditProfile from './components/wizard-edit-profile';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';
import { WizardContextMenu } from './wizard-context-menu';

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
    // getClassificationById,
    positionRequestProfileId,
    positionRequestProfileVersion,
    positionRequestId,
    setRequiresVerification,
    setPositionRequestData,
  } = useWizardContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBack, setIsLoadingBack] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);

  const handleFormChange = (state: boolean) => {
    setIsFormModified(state);
  };

  const [updatePositionRequest] = useUpdatePositionRequestMutation();

  function transformFormData(originalData: any): JobProfileModel {
    return {
      id: originalData.id,
      version: originalData.version,
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
        .filter((acc) => !acc.isCustom || acc.text.trim() !== ''), // remove items only if they are custom and empty
      education: originalData.education.filter(
        (edu: { text: string; isCustom?: boolean }) => !edu.isCustom || edu.text.trim() !== '',
      ),
      job_experience: originalData.job_experience.filter(
        (exp: { text: string; isCustom?: boolean }) => !exp.isCustom || exp.text.trim() !== '',
      ),
      behavioural_competencies: originalData.behavioural_competencies,
      // classifications: originalData.classifications.map((classification: any) => ({
      //   classification: getClassificationById(classification.classification),
      // })),
      role: { id: originalData.roleId || null },
      role_type: { id: originalData.roleTypeId || null },
      scopes: [], //{ id: originalData.scopeId || null },
      reports_to: [],
      organizations: [],
      review_required: false,
      professions: [],
      professional_registration_requirements: [
        ...originalData.professional_registration_requirements,
        ...originalData.optional_professional_registration_requirements,
      ]
        .map((acc) => ({
          text: acc.text,
          is_significant: acc.is_significant,
          is_readonly: acc.is_readonly,
          isCustom: acc.isCustom,
          disabled: acc.disabled,
        }))
        .filter((acc) => !acc.isCustom || acc.text.trim() !== ''), // remove items only if they are custom and empty
      optional_requirements: originalData.optional_requirements.filter(
        (req: { text: string; isCustom?: boolean }) => !req.isCustom || req.text.trim() !== '',
      ),
      preferences: originalData.preferences.filter(
        (pref: { text: string; isCustom?: boolean }) => !pref.isCustom || pref.text.trim() !== '',
      ),
      knowledge_skills_abilities: originalData.knowledge_skills_abilities.filter(
        (ksa: { text: string; isCustom?: boolean }) => !ksa.isCustom || ksa.text.trim() !== '',
      ),
      willingness_statements: originalData.willingness_statements
        .map((proviso: any) => ({
          text: proviso.text,
          isCustom: proviso.isCustom,
          disabled: proviso.disabled,
        }))
        .filter((stmt: { text: string; isCustom?: boolean }) => !stmt.isCustom || stmt.text.trim() !== ''),
      security_screenings: [...originalData.security_screenings, ...originalData.optional_security_screenings]
        .map((acc) => ({
          text: acc.text,
          is_significant: acc.is_significant,
          is_readonly: acc.is_readonly,
          isCustom: acc.isCustom,
          disabled: acc.disabled,
        }))
        .filter((acc) => !acc.isCustom || acc.text.trim() !== ''), // remove items only if they are custom and empty

      // originalData.security_screenings.filter(
      //   (screening: { text: string; isCustom?: boolean }) => !screening.isCustom || screening.text.trim() !== '',
      // ),
      all_reports_to: false,
      owner: originalData.owner,
      created_at: originalData.created_at,
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

    try {
      // Create an entry in My Position Requests

      const formData = wizardEditProfileRef.current?.getFormData();
      // console.log('formData: ', formData);

      const transformedData = transformFormData(formData);
      // console.log('transformedData: ', transformedData);

      // Check if any classification is undefined or if the array is empty
      // const hasUndefinedClassification = transformedData?.classifications?.some(
      //   (item) => item.classification === undefined,
      // );
      // const isClassificationsEmpty = transformedData?.classifications?.length === 0;

      // if (
      //   (hasUndefinedClassification || isClassificationsEmpty || !transformedData?.classifications) &&
      action === 'next';
      // ) {
      //   Modal.error({
      //     title: 'Error',
      //     content: 'Could not find classification, please try again later or contact an administrator.',
      //   });
      //   return;
      // }

      // if (transformedData.classifications == [{}]) console.log('whhoops');

      setWizardData(transformedData);
      try {
        if (positionRequestId) {
          const resp = await updatePositionRequest({
            id: positionRequestId,
            step: !step && step != 0 ? (action === 'next' ? 4 : action === 'back' ? 2 : 3) : step,
            // increment max step only if it's not incremented
            ...(action === 'next' && (positionRequest?.max_step_completed ?? 0) < 4 && !step && step != 0
              ? { max_step_completed: 4 }
              : {}),
            profile_json: transformedData,
            title: formData.title.text,
            returnFullObject: true,
          }).unwrap();
          setPositionRequestData(resp.updatePositionRequest ?? null);
        }
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
      console.log('error: ', e);
      return false;
    } finally {
      if (action === 'next') setIsLoading(false);
      else if (action === 'back') setIsLoadingBack(false);
    }
  };

  const onNextCallback = async ({ step }: { step?: number } = {}) => {
    await saveData('next', step);
  };

  const onBackCallback = async () => {
    await saveData('back');
  };

  const saveAndQuit = async () => {
    // console.log('disableBlockingAndNavigateHome');
    await saveData('stay');
    disableBlockingAndNavigateHome();
  };

  const switchStep = async (step: number) => {
    if (isFormModified) {
      Modal.confirm({
        title: 'Unsaved Changes',
        content: (
          <div>
            <p>You have unsaved changes. Do you want to save them before switching steps?</p>
          </div>
        ),
        // okButtonProps: {
        //   loading: isSwitchStepLoading,
        // },
        // cancelButtonProps: {
        //   loading: isSwitchStepLoading,
        // },
        okText: 'Save',
        cancelText: 'Cancel',
        onOk: async () => {
          // setIsSwitchStepLoading(true);
          onNextCallback({ step: step });
          setIsFormModified(false);
          // setIsSwitchStepLoading(false);
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
        <div style={{ marginRight: '1rem' }} key="statusIndicator">
          <StatusIndicator status={positionRequest?.status ?? ''} />
        </div>,
        <WizardContextMenu
          positionRequestId={positionRequestId}
          onSaveAndQuit={saveAndQuit}
          onNavigateHome={disableBlockingAndNavigateHome}
          shareableLink={positionRequest?.shareUUID}
          positionRequestStatus={positionRequest?.status}
        />,
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
        current={3}
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

      <WizardContentWrapper>
        <Row justify="center" gutter={16}>
          <Col style={{ paddingTop: '24px' }}>
            <WizardEditProfile
              onVerificationRequiredChange={setRequiresVerification}
              ref={wizardEditProfileRef}
              profileData={wizardData}
              id={positionRequestProfileId?.toString()}
              version={positionRequestProfileVersion?.toString()}
              submitText="Review Profile"
              showBackButton={true}
              handleFormChange={handleFormChange}
            ></WizardEditProfile>
          </Col>
        </Row>
      </WizardContentWrapper>
    </WizardPageWrapper>
  );
};
