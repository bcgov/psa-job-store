/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Col, FormInstance, List, Menu, Modal, Popover, Row, Typography } from 'antd';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import {
  ClassificationModel,
  GetClassificationsResponse,
  JobProfileModel,
} from '../../redux/services/graphql-api/job-profile-types';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditProfile from './components/wizard-edit-profile';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
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
}

export const WizardEditPage: React.FC<WizardEditPageProps> = ({
  onBack,
  onNext,
  disableBlockingAndNavigateHome,
  positionRequest,
}) => {
  // "wizardData" may be the data that was already saved in context. This is used to support "back" button
  // functionality from the review screen (so that form contains data the user has previously entered)
  const {
    wizardData,
    setWizardData,
    classificationsData,
    setClassificationsData,
    positionRequestProfileId,
    positionRequestId,
  } = useWizardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBack, setIsLoadingBack] = useState(false);
  const [saveAndQuitLoading, setSaveAndQuitLoading] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);

  const [updatePositionRequest] = useUpdatePositionRequestMutation();

  const profileId = positionRequestProfileId;

  function receivedClassificationsDataCallback(data: GetClassificationsResponse) {
    setClassificationsData(data);
  }
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
      scope: { id: originalData.scopeId || null },
      reports_to: [],
      organizations: [],
      review_required: false,
      professions: [],
      professional_registration_requirements: originalData.professional_registration.filter(
        (reg: { value: string }) => reg.value.trim() !== '',
      ),
      optional_requirements: originalData.optional_requirements.filter(
        (req: { value: string }) => req.value.trim() !== '',
      ),
      preferences: originalData.preferences.filter((pref: { value: string }) => pref.value.trim() !== ''),
      knowledge_skills_abilities: originalData.knowledge_skills_abilities.filter(
        (ksa: { value: string }) => ksa.value.trim() !== '',
      ),
      willingness_statements: originalData.provisos
        .map((proviso: any) => ({
          value: proviso.value,
          isCustom: proviso.isCustom,
          disabled: proviso.disabled,
        }))
        .filter((stmt: { value: string }) => stmt.value.trim() !== ''),
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

  const saveData = async (action: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors = Object.values(wizardEditProfileRef.current?.getFormErrors()).map((error: any) => {
      const message =
        error.message != null
          ? error.message
          : error.root != null
            ? error.root?.message
            : error.value != null
              ? error.value.message
              : 'Error';
      return message;
    });

    if (errors.length) {
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
      // Create an entry in My Positions

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
            step: action === 'next' ? 3 : action === 'back' ? 1 : 2,
            profile_json: transformedData,
            title: formData.title.value,
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
        if (onNext) onNext();
      } else if (action === 'back') {
        if (onBack) {
          console.log('onback');
          onBack();
        }
      }
      return true;
    } catch (e) {
      return false;
    } finally {
      if (action === 'next') setIsLoading(false);
      else if (action === 'back') setIsLoadingBack(false);
      else setSaveAndQuitLoading(false);
    }
  };

  const onNextCallback = async () => {
    await saveData('next');
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
                Saves your progress. You can access this position request from the 'My Positions' page.
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
                Removes this position request from 'My Positions'. This action is irreversible.
              </Typography.Text>
            </div>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
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
        <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
          <Button icon={<EllipsisOutlined />}></Button>
        </Popover>,
        <Button onClick={onBackCallback} key="back" data-testid="back-button" loading={isLoadingBack}>
          Back
        </Button>,
        <Button key="next" type="primary" onClick={onNextCallback} data-testid="next-button" loading={isLoading}>
          Save and next
        </Button>,
      ]}
    >
      <WizardSteps current={2} highlightEdit={verificationRequired}></WizardSteps>
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
              onVerificationRequiredChange={setVerificationRequired}
              ref={wizardEditProfileRef}
              profileData={wizardData}
              id={profileId?.toString()}
              submitText="Review Profile"
              showBackButton={true}
              receivedClassificationsDataCallback={receivedClassificationsDataCallback}
            ></WizardEditProfile>
          </Col>
        </Row>
      </div>
    </WizardPageWrapper>
  );
};
