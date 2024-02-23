import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Col, FormInstance, List, Menu, Modal, Popover, Row, Typography } from 'antd';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  AccountabilitiesModel,
  BehaviouralCompetencies,
  ClassificationModel,
  ClassificationModelWrapped,
  GetClassificationsResponse,
  JobFamily,
  JobProfileModel,
  Stream,
} from '../../redux/services/graphql-api/job-profile-types';
import {
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
}

export const WizardEditPage: React.FC<WizardEditPageProps> = ({ onBack, onNext, disableBlockingAndNavigateHome }) => {
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

  function transformFormData(input: InputData): JobProfileModel {
    // console.log('transformFormData input: ', input);
    // Transforms data generated by the form, which is in a format like this:
    // {"title":"lorem ipsum","classification":"Clerk 9","context":"lorem ipsum","overview":"lorem ipsum",
    //  "required_accountabilities.0":"req acc 1","optional_accountabilities.0":"opt acc 1",
    //  "requirements.0":"req 1","requirements.1":"req 2","requirements.2":"req 3",
    //  "behavioural_competencies.0.behavioural_competency.name":"beh 1",
    //  "behavioural_competencies.0.behavioural_competency.description":"beh des 1"}
    //
    // To a format that's consistent with data returned from the api, which is in a format like this:
    // {"id":1,"stream":"CORPORATE","title":"lorem ipsum","number":0,"context":"lorem ipsum","overview":"lorem ipsum",
    //  "accountabilities":{"optional":["opt acc 1"],"required":["req acc 1"]},"requirements":["req 1","req 2","req 3"],
    //  "behavioural_competencies":[{"behavioural_competency":{"id":1,"name":"beh 1","description":"beh des 1"}}],
    //   "classification":{"id":1,"occupation_group":{"id":1,"code":"CLK","name":"Clerk"},"grid":{"id":1,"name":"9"}},
    //   "family":null,"role":null,"category":null,"ministry":null,"reports_to":null}

    // this is so that the edited data can be displayed for review (since this component uses API format data)
    const output: JobProfileModel = {
      id: parseInt(input.id),
      type: 'USER',
      title: { value: input['title.value'], isCustom: input['title.isCustom'], disabled: input['title.disabled'] },
      number: parseInt(input.number),
      organization_id: '-1',
      jobFamilies: [] as JobFamily[],
      streams: [] as Stream[],
      context: input.context,
      overview: {
        value: input['overview.value'],
        isCustom: input['overview.isCustom'],
        disabled: input['overview.disabled'],
      },
      program_overview: {
        value: input['program_overview.value'],
        isCustom: input['program_overview.isCustom'],
        disabled: input['program_overview.disabled'],
      },
      accountabilities: [] as AccountabilitiesModel[],
      education: [] as AccountabilitiesModel[],
      job_experience: [] as AccountabilitiesModel[],
      behavioural_competencies: [] as BehaviouralCompetencies[],
      classifications: [] as ClassificationModelWrapped[],

      role: { id: input.roleId || null },
      role_type: { id: input.roleTypeId || null },
      reports_to: [],
      organizations: [],
      scope: { id: input.scopeId || null },
      review_required: false,
      professions: [],
      professional_registration_requirements: [],
      optional_requirements: [],
      preferences: [],
      knowledge_skills_abilities: [],
      willingness_statements: [],
      security_screenings: [],
      all_organizations: false,
      all_reports_to: false,
    };

    Object.keys(input).forEach((key) => {
      const keys = key.split('.');
      const value = input[key];

      if (keys.length !== 1) {
        if (key.startsWith('classification')) {
          // console.log('starts with classification');
          const parts = key.split('.');
          const index = parseInt(parts[1]);
          // console.log('index: ', index, ' value: ', value);
          const classificationData = getClassificationById(value);

          // console.log('classificationData: ', classificationData);
          if (classificationData) {
            if (output.classifications) output.classifications[index] = { classification: classificationData };
          }
        }

        if (key.startsWith('accountabilities')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.accountabilities[index]) {
            if (input[`accountabilities.${index}.text`] != '') {
              output.accountabilities[index] = {
                text: input[`accountabilities.${index}.text`],
                isCustom: input[`accountabilities.${index}.isCustom`],
                disabled: input[`accountabilities.${index}.disabled`],
                is_significant: input[`accountabilities.${index}.is_significant`],
                is_readonly: input[`accountabilities.${index}.is_readonly`],
              };
            }
          }
        } else if (key.startsWith('security_screenings')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.security_screenings[index]) {
            if (input[`security_screenings.${index}.text`] != '') {
              output.security_screenings[index] = {
                text: input[`security_screenings.${index}.text`],
                isCustom: input[`security_screenings.${index}.isCustom`],
                disabled: input[`security_screenings.${index}.disabled`],
                is_readonly: input[`security_screenings.${index}.is_readonly`],
              };
            }
          }
        } else if (key.startsWith('professional_registration')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.professional_registration_requirements[index]) {
            if (input[`professional_registration.${index}.value`] != '') {
              output.professional_registration_requirements[index] = {
                value: input[`professional_registration.${index}.value`],
                isCustom: input[`professional_registration.${index}.isCustom`],
                disabled: input[`professional_registration.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('optional_requirements')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.optional_requirements[index]) {
            if (input[`optional_requirements.${index}.value`] != '') {
              output.optional_requirements[index] = {
                value: input[`optional_requirements.${index}.value`],
                isCustom: input[`optional_requirements.${index}.isCustom`],
                disabled: input[`optional_requirements.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('preferences')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.preferences[index]) {
            if (input[`preferences.${index}.value`] != '') {
              output.preferences[index] = {
                value: input[`preferences.${index}.value`],
                isCustom: input[`preferences.${index}.isCustom`],
                disabled: input[`preferences.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('knowledge_skills_abilities')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.knowledge_skills_abilities[index]) {
            if (input[`knowledge_skills_abilities.${index}.value`] != '') {
              output.knowledge_skills_abilities[index] = {
                value: input[`knowledge_skills_abilities.${index}.value`],
                isCustom: input[`knowledge_skills_abilities.${index}.isCustom`],
                disabled: input[`knowledge_skills_abilities.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('provisos')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.willingness_statements[index]) {
            if (input[`provisos.${index}.text`] != '') {
              output.willingness_statements[index] = {
                value: input[`provisos.${index}.value`],
                isCustom: input[`provisos.${index}.isCustom`],
                disabled: input[`provisos.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('education')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.education[index]) {
            if (input[`education.${index}.text`] != '') {
              output.education[index] = {
                text: input[`education.${index}.text`],
                isCustom: input[`education.${index}.isCustom`],
                disabled: input[`education.${index}.disabled`],
                is_significant: input[`education.${index}.is_significant`],
                is_readonly: input[`education.${index}.is_readonly`],
              };
            }
          }
        } else if (key.startsWith('job_experience')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);
          if (!output.job_experience[index]) {
            if (input[`job_experience.${index}.text`] != '') {
              output.job_experience[index] = {
                text: input[`job_experience.${index}.text`],
                isCustom: input[`job_experience.${index}.isCustom`],
                disabled: input[`job_experience.${index}.disabled`],
                is_significant: input[`job_experience.${index}.is_significant`],
                is_readonly: input[`job_experience.${index}.is_readonly`],
              };
            }
          }
        } else if (key.startsWith('behavioural_competencies')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.behavioural_competencies[index]) {
            output.behavioural_competencies[index] = { behavioural_competency: { id: -1, name: '', description: '' } };
          }

          if (parts[3] === 'name') {
            output.behavioural_competencies[index].behavioural_competency.name = value;
          } else if (parts[3] === 'description') {
            output.behavioural_competencies[index].behavioural_competency.description = value;
          } else if (parts[3] === 'id') {
            output.behavioural_competencies[index].behavioural_competency.id = parseInt(value);
          }
        }
      }
    });

    // Process optional accountabilities as a separate step
    const processedIndices = new Set();
    Object.keys(input).forEach((key) => {
      if (key.startsWith('optional_accountabilities')) {
        const parts = key.split('.');
        const index = parseInt(parts[1]);

        // Check if the index has already been processed
        if (processedIndices.has(index)) {
          // Skip this index as it's already been processed
          return;
        }

        // Mark this index as processed
        processedIndices.add(index);

        if (input[`optional_accountabilities.${index}.text`] != '') {
          output.accountabilities.push({
            text: input[`optional_accountabilities.${index}.text`],
            isCustom: input[`optional_accountabilities.${index}.isCustom`],
            disabled: input[`optional_accountabilities.${index}.disabled`],
            is_significant: input[`optional_accountabilities.${index}.is_significant`],
            is_readonly: input[`optional_accountabilities.${index}.is_readonly`],
          });
        }
      }
    });

    // console.log('transformFormData output: ', output);
    return output as unknown as JobProfileModel;
  }

  const wizardEditProfileRef = useRef<{
    submit: () => void;
    getFormData: () => ReturnType<FormInstance['getFieldsValue']>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFormErrors: () => any;
  }>(null);

  // const navigate = useNavigate();

  const onNextCallback = async () => {
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
    // Create an entry in My Positions

    const formData = wizardEditProfileRef.current?.getFormData();
    console.log('formData: ', formData);

    // return;

    const transformedData = transformFormData(formData);
    console.log('transformedData: ', transformedData);

    setWizardData(transformedData);

    try {
      if (positionRequestId)
        await updatePositionRequest({
          id: positionRequestId,
          step: 3,
          profile_json: transformedData,
          title: formData['title.value'],
          // classification_code: classification ? classification.code : '',
        }).unwrap();
    } catch (error) {
      // Handle the error, possibly showing another modal
      Modal.error({
        title: 'Error updating position',
        content: 'An unknown error occurred', //error.data?.message ||
      });
    }
    if (onNext) onNext();
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

  const getMenuContent = () => {
    return (
      <Menu>
        <Menu.Item key="save" onClick={disableBlockingAndNavigateHome}>
          <div style={{ padding: '5px 0' }}>
            Save and quit
            <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
              Saves your progress. You can access this position request from the 'My Positions' page.
            </Typography.Text>
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
      // title="Edit profile" subTitle="You may now edit the profile." xxl={20} xl={20} lg={20}

      title={
        <div>
          <Link to="/">
            <ArrowLeftOutlined style={{ color: 'black', marginRight: '1rem' }} />
          </Link>
          Edit profile
        </div>
      }
      subTitle={<div>You may now edit the profile.</div>}
      additionalBreadcrumb={{ title: 'New position' }}
      // subTitle="Choose a job profile to modify for the new positions"
      hpad={false}
      grayBg={false}
      pageHeaderExtra={[
        <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
          <Button icon={<EllipsisOutlined />}></Button>
        </Popover>,
        <Button onClick={onBack} key="back">
          Back
        </Button>,
        <Button key="next" type="primary" onClick={onNextCallback} data-testid="next-button">
          Save and next
        </Button>,
      ]}
    >
      <WizardSteps current={2}></WizardSteps>
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
