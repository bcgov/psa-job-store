import { FormInstance, List, Modal } from 'antd';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BehaviouralCompetencies,
  ClassificationModel,
  GetClassificationsResponse,
  JobProfileModel,
  TrackedFieldArrayItem,
} from '../../redux/services/graphql-api/job-profile-types';
import { useCreatePositionRequestMutation } from '../../redux/services/graphql-api/position-request.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import WizardEditProfile from './components/wizard-edit-profile';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';

export interface InputData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const WizardEditPage = () => {
  // "wizardData" may be the data that was already saved in context. This is used to support "back" button
  // functionality from the review screen (so that form contains data the user has previously entered)
  const {
    wizardData,
    setWizardData,
    classificationsData,
    setClassificationsData,
    errors,
    setErrors,
    setPositionRequestId,
  } = useWizardContext();
  const { profileId } = useParams();
  const [createPositionRequest] = useCreatePositionRequestMutation();

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
      stream: 'USER',
      title: { value: input['title.value'], isCustom: input['title.isCustom'], disabled: input['title.disabled'] },
      number: parseInt(input.number),
      organization_id: '-1',
      family_id: -1,
      context: input.context,
      overview: {
        value: input['overview.value'],
        isCustom: input['overview.isCustom'],
        disabled: input['overview.disabled'],
      },
      accountabilities: {
        optional: [] as TrackedFieldArrayItem[],
        required: [] as TrackedFieldArrayItem[],
      },
      requirements: [] as string[],
      behavioural_competencies: [] as BehaviouralCompetencies[],
      classification: {
        id: input.classification,
      } as ClassificationModel,
    };

    Object.keys(input).forEach((key) => {
      const keys = key.split('.');
      const value = input[key];

      if (keys.length === 1) {
        if (key === 'classification') {
          const classificationData = getClassificationById(value);

          if (classificationData) {
            output.classification = classificationData;
          }
        }
      } else {
        if (key.startsWith('required_accountabilities')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.accountabilities.required[index]) {
            if (input[`required_accountabilities.${index}.value`] != '') {
              output.accountabilities.required[index] = {
                value: input[`required_accountabilities.${index}.value`],
                isCustom: input[`required_accountabilities.${index}.isCustom`],
                disabled: input[`required_accountabilities.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('optional_accountabilities')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.accountabilities.optional[index]) {
            if (input[`optional_accountabilities.${index}.value`] != '') {
              output.accountabilities.optional[index] = {
                value: input[`optional_accountabilities.${index}.value`],
                isCustom: input[`optional_accountabilities.${index}.isCustom`],
                disabled: input[`optional_accountabilities.${index}.disabled`],
              };
            }
          }
        } else if (key.startsWith('requirements')) {
          const parts = key.split('.');
          const index = parseInt(parts[1]);

          if (!output.requirements[index]) {
            if (input[`requirements.${index}.value`] != '') {
              output.requirements[index] = {
                value: input[`requirements.${index}.value`],
                isCustom: input[`requirements.${index}.isCustom`],
                disabled: input[`requirements.${index}.disabled`],
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

    // console.log('transformFormData output: ', output);
    return output as unknown as JobProfileModel;
  }

  const wizardEditProfileRef = useRef<{
    submit: () => void;
    getFormData: () => ReturnType<FormInstance['getFieldsValue']>;
  }>(null);

  const navigate = useNavigate();
  const onNext = async () => {
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
    const transformedData = transformFormData(formData);
    setWizardData(transformedData);

    try {
      const classification = getClassificationById(formData.classification);
      const positionRequestInput = {
        step: 1,
        reports_to_position_id: 123,
        profile_json: transformedData,
        parent_job_profile: { connect: { id: 1 } },
        title: formData['title.value'],
        classification_id: formData.classification,
        classification_code: classification ? classification.code : '',
      };
      // console.log('positionRequestInput: ', positionRequestInput);
      // console.log('formData: ', formData);

      const resp = await createPositionRequest(positionRequestInput).unwrap();
      setPositionRequestId(resp.createPositionRequest);

      // Handle the response if needed, or navigate to the next page
      navigate('/wizard/review');
    } catch (error) {
      // Handle the error, possibly showing another modal
      Modal.error({
        title: 'Error Creating Position',
        content: 'An unknown error occurred', //error.data?.message ||
      });
    }
  };

  return (
    <WizardPageWrapper
      title="Edit profile"
      subTitle="Make changes to an approved job profile (optional)"
      xxl={14}
      xl={18}
      lg={18}
    >
      <WizardSteps current={1} xl={24}></WizardSteps>
      <WizardEditControlBar
        style={{ marginBottom: '1rem' }}
        onNext={onNext}
        showChooseDifferentProfile={true}
        nextText="Save and Next"
      />

      <WizardEditProfile
        ref={wizardEditProfileRef}
        profileData={wizardData}
        id={profileId}
        submitText="Review Profile"
        // submitHandler={onSubmit}
        showBackButton={true}
        receivedClassificationsDataCallback={receivedClassificationsDataCallback}
        setErrors={setErrors}
      ></WizardEditProfile>
    </WizardPageWrapper>
  );
};
