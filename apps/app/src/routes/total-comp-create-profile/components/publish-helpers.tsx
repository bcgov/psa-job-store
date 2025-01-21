import { Button, List, Modal, message, notification } from 'antd';
import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClassificationConnectInput,
  CreateJobProfileInput,
  OrganizationConnectInput,
} from '../../../redux/services/graphql-api/job-profile-types';
import {
  useCreateOrUpdateJobProfileMutation,
  useLazyGetJobProfileMetaQuery,
  useLazyGetJobProfileQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import { FormContext } from './form.context';
import { useTCContext } from './total-comp-create-profile.provider';

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success('Error message copied!');
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};

export const useJobProfileSubmit = (setId: (id: string) => void) => {
  const navigate = useNavigate();
  const [createJobProfile] = useCreateOrUpdateJobProfileMutation();

  const submitJobProfileData = async (transformedData: CreateJobProfileInput, isPublishing = false) => {
    try {
      const response = await createJobProfile(transformedData).unwrap();
      // console.log('response: ', response);
      if (!isPublishing) {
        // saving as draft
        const newId = response.createOrUpdateJobProfile.toString();
        setId(newId);
        navigate(`/job-profiles/manage/draft/${newId}`); // Update the URL
      } else {
        // saving as published
        const newId = response.createOrUpdateJobProfile.toString();
        navigate(`/job-profiles/manage/published/${newId}`); // Update the URL
      }

      notification.success({
        message: 'Success',
        description: 'Job profile saved successfully.',
        duration: 4, // Duration in seconds
      });
      // console.log('Job Profile Created ok: ', response, id);
    } catch (error: any) {
      // console.log('error: ', error);
      let desc = 'There was an error saving the job profile.';

      if (error?.message?.includes('A job profile with this number already exists'))
        desc = 'A job profile with this number already exists. Please use a different number.';
      else desc = error.message;

      const displayDesc = desc.length > 300 ? `${desc.substring(0, 300)}...` : desc;

      notification.error({
        message: 'Error',
        description: (
          <div>
            <p>{displayDesc}</p>
            <Button type="primary" onClick={() => copyToClipboard(desc)}>
              Copy Error Message
            </Button>
          </div>
        ),
        duration: 0, // don't hide error so user can copy error message
      });
      console.error('Error creating job profile: ', error);
    }
  };

  return { submitJobProfileData };
};

function transformFormDataToApiSchema({ formData, id, jobProfileData }: any): CreateJobProfileInput {
  // console.log('transformFormDataToApiSchema formData: ', formData);
  return {
    data: {
      state: formData.state,
      title: formData.title.text,
      type: 'MINISTRY', // this gets set on the server
      number: parseInt(formData.jobStoreNumber, 10),
      overview: formData.overview.text,
      program_overview: formData.program_overview.text,
      review_required: formData.classificationReviewRequired,
      accountabilities: formData.accountabilities
        .map((a: any) => ({
          text: a.text,
          is_readonly: a.nonEditable,
          is_significant: a.is_significant,
        }))
        .filter((acc: { text: string }) => acc.text?.trim() !== ''),
      education: formData.education
        .map((a: any) => ({
          text: a.text,
          is_readonly: a.nonEditable,
          is_significant: a.is_significant,
          tc_is_readonly: a.tc_is_readonly,
        }))
        .filter((acc: { text: string }) => acc.text?.trim() !== ''),
      job_experience: formData.job_experience
        .map((a: any) => ({
          text: a.text,
          is_readonly: a.nonEditable,
          is_significant: a.is_significant,
        }))
        .filter((acc: { text: string }) => acc.text?.trim() !== ''),
      professional_registration_requirements: formData.professional_registration_requirements
        .map((a: any) => ({
          text: a.text,
          is_readonly: a.nonEditable,
          is_significant: a.is_significant,
          tc_is_readonly: a.tc_is_readonly,
        }))
        .filter((acc: any) => acc.text?.trim() !== ''),
      optional_requirements: formData.optional_requirements
        .map((o: any) => o.text)
        .filter((acc: string) => acc.trim() !== ''),
      preferences: formData.preferences
        .map((a: any) => ({
          text: a.text,
          tc_is_readonly: a.tc_is_readonly,
        }))
        .filter((acc: any) => acc.text?.trim() !== ''),
      knowledge_skills_abilities: formData.knowledge_skills_abilities
        .map((a: any) => ({
          text: a.text,
          tc_is_readonly: a.tc_is_readonly,
        }))
        .filter((acc: any) => acc.text?.trim() !== ''),
      willingness_statements: formData.willingness_statements
        .map((a: any) => ({
          text: a.text,
          tc_is_readonly: a.tc_is_readonly,
        }))
        .filter((acc: any) => acc.text?.trim() !== ''),
      security_screenings: formData.security_screenings
        .map((a: any) => ({
          text: a.text,
          is_readonly: a.nonEditable ?? false,
          is_significant: a.is_significant ?? false,
          tc_is_readonly: a.tc_is_readonly,
        }))
        .filter((acc: { text: string }) => acc.text?.trim() !== ''),
      all_reports_to: formData.all_reports_to,
      all_organizations: formData.all_organizations,
      total_comp_create_form_misc: {
        markAllNonEditable: formData.markAllNonEditable,
        markAllSignificant: formData.markAllSignificant,
        markAllNonEditableEdu: formData.markAllNonEditableEdu,
        markAllSignificantEdu: formData.markAllSignificantEdu,
        markAllNonEditableProReg: formData.markAllNonEditableProReg,
        markAllSignificantProReg: formData.markAllSignificantProReg,
        markAllSignificantSecurityScreenings: formData.markAllSignificantSecurityScreenings,
        markAllNonEditableJob_experience: formData.markAllNonEditableJob_experience,
        markAllSignificantJob_experience: formData.markAllSignificantJob_experience,

        markAllNonEditableSec: formData.markAllNonEditableSec,
      },
      behavioural_competencies: formData.behavioural_competencies
        .map((a: any) => ({
          id: a.id,
          name: a.name,
          description: a.description,
        }))
        .filter((acc: any) => acc.text?.trim() !== ''),

      ...(formData.employeeClassificationGroups &&
        formData.employeeClassificationGroups.length > 0 &&
        formData.employeeClassificationGroups[0].classification &&
        formData.employeeClassificationGroups[0].classification !== '' && {
          classifications: {
            create: formData.employeeClassificationGroups.map((ecg: any) => ({
              classification: {
                connect: {
                  id_employee_group_id_peoplesoft_id: {
                    id: ecg.classification.split('.')[0],
                    employee_group_id: ecg.classification.split('.')[1],
                    peoplesoft_id: ecg.classification.split('.')[2],
                  },
                },
              },
            })),
          },
        }),
      organizations: formData.all_organizations
        ? { create: [] as OrganizationConnectInput[] }
        : {
            create: formData.ministries.map((orgId: any) => ({
              organization: { connect: { id: orgId } },
            })),
          },
      context: formData.jobContext,
      ...(formData.jobRole && {
        role: { connect: { id: formData.jobRole } },
      }),
      role_type: { connect: { id: formData.role } },
      ...(formData.scopeOfResponsibility && {
        scopes: {
          create: formData.scopeOfResponsibility.map((scopeId: number) => ({
            scope: { connect: { id: scopeId } },
          })),
        },
      }),
      jobFamilies: {
        create: formData.professions
          .filter((pf: any) => pf.jobFamily !== -1) // Filter out professions with jobFamily -1
          .map((pf: any) => ({
            jobFamily: { connect: { id: pf.jobFamily } },
          })),
      },
      streams: {
        create: formData.professions.flatMap((pf: any) =>
          pf.jobStreams.map((streamId: any) => ({
            stream: { connect: { id: streamId } },
          })),
        ),
      },

      reports_to: formData.all_reports_to
        ? { create: [] as ClassificationConnectInput[] }
        : {
            create: formData.reportToRelationship.map((classificationId: any) => {
              const [id, employee_group_id, peoplesoft_id] = classificationId.split('.');

              return {
                classification: {
                  connect: {
                    id_employee_group_id_peoplesoft_id: {
                      id: id,
                      employee_group_id: employee_group_id,
                      peoplesoft_id: peoplesoft_id,
                    },
                  },
                },
              };
            }),
          },
      version: formData.version,
      id: parseInt(id ?? '0'),
      owner: {
        connect: { id: jobProfileData?.jobProfile.owner?.id },
      },
      created_at: jobProfileData?.jobProfile.created_at,
      published_by: {
        connect: { id: jobProfileData?.jobProfile.published_by?.id },
      },
      published_at: jobProfileData?.jobProfile.published_at,
    },
  };
}

export const getTransofrmedData = ({
  isPublishing = false,
  isUnpublishing = false,
  id,
  jobProfileData,
  getBasicDetailsValues,
  getProfileValues,
  state,
  profileSetValue,
}: any) => {
  // console.log('save, isPublishing: ', isPublishing);
  const basicDetails = getBasicDetailsValues();
  const profileDetails = getProfileValues();

  // console.log('basicDetails: ', basicDetails);

  if (isUnpublishing) isPublishing = false;
  const newState = isPublishing ? 'PUBLISHED' : isUnpublishing ? 'DRAFT' : state;
  const combinedData = {
    ...basicDetails,
    ...profileDetails,
    // Set the state based on whether the job profile is being published
    state: newState,
    is_archived: isPublishing ? false : isUnpublishing ? true : undefined,
    version: jobProfileData?.jobProfile.version,
  };

  if (isPublishing) {
    profileSetValue('state', 'PUBLISHED');
  } else if (isUnpublishing) {
    profileSetValue('state', 'DRAFT');
  }

  // console.log('Combined form data:', combinedData);

  const transformedData = transformFormDataToApiSchema({ formData: combinedData, id, jobProfileData });
  // console.log('transformedData: ', transformedData);

  return transformedData;
};

export const useSave = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form context must be used within FormContext.Provider');
  }
  const { jobProfileUseFormReturn, basicUseFormReturn, watchedState: state } = context;
  const {
    getValues: getProfileValues,
    setValue: profileSetValue,
    formState: profileFormState,
  } = jobProfileUseFormReturn;
  const { getValues: getBasicDetailsValues, formState: basicFormState } = basicUseFormReturn;

  const { setProfileJson, setJobProfileMeta, jobProfileData, setId, id } = useTCContext();
  const { submitJobProfileData } = useJobProfileSubmit(setId);

  const [triggerGetJobProfile, { data: lazyJobProfile }] = useLazyGetJobProfileQuery();
  const [triggerGetJobProfileMeta, { data: jobProfileMeta }] = useLazyGetJobProfileMetaQuery();
  useEffect(() => {
    if (lazyJobProfile) {
      setProfileJson(lazyJobProfile);
      triggerGetJobProfileMeta(lazyJobProfile.jobProfile.id);
    }
  }, [lazyJobProfile, triggerGetJobProfileMeta]);

  useEffect(() => {
    if (jobProfileMeta) {
      setJobProfileMeta(jobProfileMeta);
    }
  }, [jobProfileMeta]);

  // console.log('profileFormState.errors: ', profileFormState.errors);

  const save = useCallback(
    async ({ isPublishing = false, isUnpublishing = false }: any = {}) => {
      // validate only if publishing
      if (state === 'PUBLISHED' || isPublishing) {
        // console.log('PUBLISHING, state: ', state, ', isPublishing: ', isPublishing);
        const errors = Object.values(profileFormState.errors).map((error: any) => {
          const message =
            error.message != null
              ? error.message
              : error.root != null
                ? error.root?.message
                : error.value != null
                  ? error.value.message
                  : error?.text.message
                    ? error.text.message
                    : 'Error';
          return message;
        });

        const errors2 = Object.values(basicFormState.errors)
          .map((error: any) => {
            // only interested in title validation here
            // todo: tag the error so it's easier to identify
            // if (!error?.text?.message || !error?.text?.message.toString().startsWith('Title must be between'))
            //   return null;

            const message =
              error.message != null
                ? error.message
                : error.root != null
                  ? error.root?.message
                  : error.value != null
                    ? error.value.message
                    : error?.text.message
                      ? error.text.message
                      : 'Error';
            return message;
          })
          .filter((m) => m != null);

        if (errors.length || errors2.length) {
          Modal.error({
            title: 'Errors',
            content: (
              <List>
                {errors2.map((message, index) => (
                  <List.Item>
                    <p key={index}>{message}</p>
                  </List.Item>
                ))}
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
      }

      const transformedData = getTransofrmedData({
        isPublishing,
        isUnpublishing,
        id,
        jobProfileData,
        getBasicDetailsValues,
        getProfileValues,
        state,
        profileSetValue,
      });

      await submitJobProfileData(transformedData, isPublishing);
      // Refetch job profile data
      if (isNaN(parseInt(id ?? ''))) return;

      await triggerGetJobProfile({ id: parseInt(id ?? '') });
    },
    [basicFormState, profileFormState, state, id, jobProfileData, basicFormState.errors, profileFormState.errors],
  );

  return save;
};

// export const unpublish = async () => {
//   await save(false, true);
// };

// export const publish = async () => {
//   await save(true);
// };

export const usePublishConfirm = () => {
  const save = useSave();

  const showPublishConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Publish profile',
      content:
        'Publishing the job profile to the Job Store will allow hiring managers view the profile. Are you sure you want to continue?',
      okText: 'Publish profile',
      cancelText: 'Cancel',
      async onOk() {
        // Call the function to handle the publish action
        await save({ isPublishing: true });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }, [save]);

  return showPublishConfirm;
};

export const useUnPublishConfirm = () => {
  const save = useSave();
  const showUnPublishConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Unpublish Profile',
      content:
        'Unpublishing the job profile from the Job Store will remove public access to the profile. Are you sure you want to continue?',
      okText: 'Unpublish profile',
      cancelText: 'Cancel',
      async onOk() {
        // Call the function to handle the publish action
        await save({ isPublishing: false, isUnpublishing: true });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }, [save]);
  return showUnPublishConfirm;
};
