/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Tooltip,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import DOMPurify from 'dompurify';
import debounce from 'lodash.debounce';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/custom-descriptions.css';
import '../../../components/app/common/css/custom-form.css';
import { useLazyGetClassificationsQuery } from '../../../redux/services/graphql-api/classification.api';
import {
  GetClassificationsResponse,
  JobProfileModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { useGetPositionRequestQuery } from '../../../redux/services/graphql-api/position-request.api';
import { PositionProfileModel, useLazyGetPositionProfileQuery } from '../../../redux/services/graphql-api/position.api';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { IsIndigenousCompetency } from './is-indigenous-competency.component';
import BehaviouralComptencyPicker from './wizard-behavioural-comptency-picker';
import './wizard-edit-profile.css';
import { useWizardContext } from './wizard.provider';

interface ConfigProps {
  classificationEditable?: boolean;
  contextEditable?: boolean;
}

interface WizardEditProfileProps {
  id?: string;
  profileData?: JobProfileModel | null;
  config?: ConfigProps;
  submitHandler?: SubmitHandler<JobProfileValidationModel>;
  submitText?: string;
  showBackButton?: boolean;
  receivedClassificationsDataCallback?: (data: GetClassificationsResponse) => void;
}

const WizardEditProfile = forwardRef(
  ({ id, profileData, config, submitHandler, receivedClassificationsDataCallback }: WizardEditProfileProps, ref) => {
    const [triggerGetClassificationData, { data: classificationsData, isLoading: classificationsDataIsLoading }] =
      useLazyGetClassificationsQuery();

    const initialData = profileData ?? null;
    const [effectiveData, setEffectiveData] = useState<JobProfileModel | null>(initialData);
    const [triggerGetJobProfile, { data, isLoading }] = useLazyGetJobProfileQuery();

    useEffect(() => {
      // If profileData exists, use it to set the form state
      if (profileData) {
        setEffectiveData(profileData);
      } else if (!profileData && id) {
        // If no profileData is provided and an id exists, fetch the data
        triggerGetJobProfile({ id: +id });
      }
      triggerGetClassificationData(); // get data to populate classification dropdown. Todo: cache this?
    }, [id, profileData, triggerGetJobProfile, triggerGetClassificationData]);

    useEffect(() => {
      if (classificationsData && !classificationsDataIsLoading && receivedClassificationsDataCallback) {
        receivedClassificationsDataCallback(classificationsData);
      }
    }, [classificationsData, classificationsDataIsLoading, receivedClassificationsDataCallback]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { control, reset, handleSubmit, getValues, formState, trigger } = useForm<JobProfileValidationModel>({
      resolver: classValidatorResolver(JobProfileValidationModel),
      mode: 'onChange',
    });

    useEffect(() => {
      if (!profileData && data && !isLoading) {
        // Only set effectiveData from fetched data if profileData is not provided
        setEffectiveData(data.jobProfile);
        trigger();
      }
    }, [data, isLoading, profileData, trigger]);

    const [form] = Form.useForm();

    // todo: usage of this approach is undesirable, however it fixes various render issues
    // that appear to be linked with the custom FormItem component. Ideally eliminate the usage
    // of this state
    // const [renderKey, setRenderKey] = useState(0);
    // useEffect(() => {
    //   form.resetFields(); // "form" is needed to use with ref and to get the state. Must do "resetFields"
    //   // as part of the render hack. todo: get rid of this if possible
    // }, [renderKey, form]);

    const {
      originalValuesSet,
      setOriginalValuesSet,
      originalOverview,
      setOriginalOverview,
      originalProgramOverview,
      setOriginalProgramOverview,
      originalTitle,
      setOriginalTitle,
      originalMinReqFields,
      setOriginalMinReqFields,
      originalRelWorkFields,
      setOriginalRelWorkFields,
      originalSecurityScreeningsFields,
      setOriginalSecurityScreeningsFields,
      originalAccReqFields,
      setOriginalAccReqFields,
      originalOptReqFields,
      setOriginalOptReqFields,

      originalProfessionalRegistrationFields,
      setOriginalProfessionalRegistrationFields,

      originalOptionalRequirementsFields,
      setOriginalOptionalRequirementsFields,

      originalPreferencesFields,
      setOriginalPreferencesFields,
      originalKnowledgeSkillsAbilitiesFields,
      setOriginalKnowledgeSkillsAbilitiesFields,
      originalProvisosFields,
      setOriginalProvisosFields,

      positionRequestId,
      // errors,
    } = useWizardContext();

    // console.log('effectiveData: ', effectiveData);
    useEffect(() => {
      if (effectiveData && !isLoading && classificationsData) {
        const classificationIds =
          effectiveData?.classifications?.map((c) => ({ classification: c.classification.id })) ?? [];

        // required accountabilities
        const originalAccReqFieldsValue = effectiveData.accountabilities
          .map((item) => {
            if (typeof item === 'string') {
              return {
                text: item,
                isCustom: false,
                disabled: false,
              };
            } else {
              if (item.is_significant)
                return {
                  text: item.text,
                  isCustom: item.isCustom,
                  disabled: item.disabled,
                  is_readonly: item.is_readonly,
                  is_significant: item.is_significant,
                };
            }
          })
          .filter((item) => item !== undefined);

        if (!originalValuesSet) setOriginalAccReqFields(originalAccReqFieldsValue);

        // Initialize an object to track the edit status of each field
        let initialEditStatus: { [key: number]: boolean } = {};

        // Iterate over each minimum requirement field and compare with the original value
        originalAccReqFieldsValue.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item?.text !== originalAccReqFields[index]?.text;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedMinReqFields state
        setEditedAccReqFields(initialEditStatus);

        const originalOptReqFieldsValue = effectiveData.accountabilities
          .map((item) => {
            if (typeof item === 'string') {
              return {
                text: item,
                isCustom: false,
                disabled: false,
              };
            } else {
              if (!item.is_significant) {
                return {
                  text: item.text,
                  isCustom: item.isCustom,
                  disabled: item.disabled,
                  is_readonly: item.is_readonly,
                  is_significant: item.is_significant,
                };
              }
            }
          })
          .filter((item) => item !== undefined);
        if (!originalValuesSet) setOriginalOptReqFields(originalOptReqFieldsValue);

        initialEditStatus = {};
        // // Iterate over each minimum requirement field and compare with the original value
        originalOptReqFieldsValue.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item?.text !== originalOptReqFields[index]?.text;
          initialEditStatus[index] = isEdited;
        });

        // // Set the editedMinReqFields state
        setEditedOptReqFields(initialEditStatus);

        const originalMinReqFieldsValue = effectiveData.education?.map((item) => {
          if (typeof item === 'string') {
            return {
              text: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              text: item.text,
              isCustom: item.isCustom,
              disabled: item.disabled,
              is_readonly: item.is_readonly,
              is_significant: item.is_significant,
            };
          }
        });
        if (!originalValuesSet) setOriginalMinReqFields(originalMinReqFieldsValue);

        // Initialize an object to track the edit status of each field
        initialEditStatus = {};

        // Iterate over each minimum requirement field and compare with the original value
        originalMinReqFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.text !== originalMinReqFields[index]?.text;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedMinReqFields state
        setEditedMinReqFields(initialEditStatus);

        // RELATED EXPERIENCE
        initialEditStatus = {};
        const originalRelWorkFieldsValue = effectiveData.job_experience?.map((item) => {
          if (typeof item === 'string') {
            return {
              text: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              text: item.text,
              isCustom: item.isCustom,
              disabled: item.disabled,
              is_readonly: item.is_readonly,
              is_significant: item.is_significant,
            };
          }
        });
        if (!originalValuesSet) setOriginalRelWorkFields(originalRelWorkFieldsValue);

        // Iterate over each related experience field and compare with the original value
        originalRelWorkFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.text !== originalRelWorkFields[index]?.text;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedRelWorkFields state
        setEditedRelWorkFields(initialEditStatus);

        // SECURITY SCREENINGS
        initialEditStatus = {};
        const originalSecurityScreeningsFieldsValue = effectiveData.security_screenings?.map((item) => {
          if (typeof item === 'string') {
            return {
              text: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              text: item.text,
              isCustom: item.isCustom,
              disabled: item.disabled,
              is_readonly: item.is_readonly,
            };
          }
        });
        if (!originalValuesSet) setOriginalSecurityScreeningsFields(originalSecurityScreeningsFieldsValue);

        // Iterate over each security screening field and compare with the original value
        originalSecurityScreeningsFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.text !== originalSecurityScreeningsFields[index]?.text;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedSecurityScreeningsFields state
        setEditedSecurityScreeningsFields(initialEditStatus);

        // PROFESSIONAL REGISTRATION
        //   originalProfessionalRegistrationFields,
        // setOriginalProfessionalRegistrationFields,
        initialEditStatus = {};
        const originalProfessionalRegistrationFieldsValue = effectiveData.professional_registration_requirements?.map(
          (item) => {
            if (typeof item === 'string') {
              return {
                value: item,
                isCustom: false,
                disabled: false,
              };
            } else {
              return {
                value: item.value,
                isCustom: item.isCustom,
                disabled: item.disabled,
              };
            }
          },
        );
        if (!originalValuesSet) setOriginalProfessionalRegistrationFields(originalProfessionalRegistrationFieldsValue);

        originalProfessionalRegistrationFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalProfessionalRegistrationFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        setEditedProfessionalRegistrationFields(initialEditStatus);

        // OPTIONAL REQUIREMENTS
        initialEditStatus = {};
        const originalOptionalRequirementsFieldsValue = effectiveData.optional_requirements?.map((item) => {
          if (typeof item === 'string') {
            return {
              value: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              value: item.value,
              isCustom: item.isCustom,
              disabled: item.disabled,
            };
          }
        });
        if (!originalValuesSet) setOriginalOptionalRequirementsFields(originalOptionalRequirementsFieldsValue);

        originalOptionalRequirementsFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalOptionalRequirementsFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        setEditedOptionalRequirementsFields(initialEditStatus);

        // PREFERENCES
        // originalPreferencesFields,
        // setOriginalPreferencesFields,
        initialEditStatus = {};
        const originalPreferencesFieldsValue = effectiveData.preferences?.map((item) => {
          if (typeof item === 'string') {
            return {
              value: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              value: item.value,
              isCustom: item.isCustom,
              disabled: item.disabled,
            };
          }
        });
        if (!originalValuesSet) setOriginalPreferencesFields(originalPreferencesFieldsValue);

        originalPreferencesFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalPreferencesFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        setEditedPreferencesFields(initialEditStatus);

        // KNOWLEDGE SKILLS ABILITIES
        // originalKnowledgeSkillsAbilitiesFields,
        // setOriginalKnowledgeSkillsAbilitiesFields,
        initialEditStatus = {};
        const originalKnowledgeSkillsAbilitiesFieldsValue = effectiveData.knowledge_skills_abilities?.map((item) => {
          if (typeof item === 'string') {
            return {
              value: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              value: item.value,
              isCustom: item.isCustom,
              disabled: item.disabled,
            };
          }
        });
        if (!originalValuesSet) setOriginalKnowledgeSkillsAbilitiesFields(originalKnowledgeSkillsAbilitiesFieldsValue);

        originalKnowledgeSkillsAbilitiesFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalKnowledgeSkillsAbilitiesFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        setEditedKnowledgeSkillsAbilitiesFields(initialEditStatus);

        // PROVISOS
        // originalProvisosFields,
        // setOriginalProvisosFields,
        initialEditStatus = {};
        const originalProvisosFieldsValue = effectiveData.willingness_statements?.map((item) => {
          if (typeof item === 'string') {
            return {
              value: item,
              isCustom: false,
              disabled: false,
            };
          } else {
            return {
              value: item.value,
              isCustom: item.isCustom,
              disabled: item.disabled,
            };
          }
        });
        if (!originalValuesSet) setOriginalProvisosFields(originalProvisosFieldsValue);

        // Iterate over each proviso field and compare with the original value
        originalProvisosFieldsValue?.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalProvisosFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        setEditedProvisosFields(initialEditStatus);

        // TITLE
        // Set the original value for title
        const originalTitleValue =
          typeof effectiveData.title === 'string'
            ? {
                value: effectiveData.title,
                isCustom: false,
                disabled: false,
              }
            : {
                value: effectiveData.title.value,
                isCustom: effectiveData.title.isCustom,
                disabled: effectiveData.title.disabled,
              };

        if (!originalValuesSet) setOriginalTitle(originalTitleValue);
        setTitleEdited(originalTitle.value !== originalTitleValue.value);

        // OVERVIEW
        const originalOverviewValue =
          typeof effectiveData.overview === 'string'
            ? {
                value: effectiveData.overview,
                isCustom: false,
                disabled: false,
              }
            : {
                value: effectiveData.overview.value,
                isCustom: effectiveData.overview.isCustom,
                disabled: effectiveData.overview.disabled,
              };
        if (!originalValuesSet) setOriginalOverview(originalOverviewValue);
        setOverviewEdited(originalOverview.value !== originalOverviewValue.value);

        // PROGRAM OVERVIEW
        const originalProgramOverviewValue =
          typeof effectiveData.program_overview === 'string'
            ? {
                value: effectiveData.program_overview,
                isCustom: false,
                disabled: false,
              }
            : {
                value: effectiveData.program_overview.value,
                isCustom: effectiveData.program_overview.isCustom,
                disabled: effectiveData.program_overview.disabled,
              };
        if (!originalValuesSet) setOriginalProgramOverview(originalProgramOverviewValue);
        setProgramOverviewEdited(originalProgramOverviewValue.value !== originalProgramOverviewValue.value);

        // DONE FIELDS
        if (!originalValuesSet) setOriginalValuesSet(true);

        // console.log('effectiveData?.context?.description: ', effectiveData?.context?.description);
        // console.log('originalAccReqFieldsValue: ', originalAccReqFieldsValue);
        reset({
          id: effectiveData?.id,
          number: effectiveData?.number,
          title: originalTitleValue,
          context:
            typeof effectiveData?.context === 'string' ? effectiveData?.context : effectiveData?.context.description,
          overview: originalOverviewValue,
          program_overview: originalProgramOverviewValue,
          classifications: classificationIds,
          // array fileds are required to be nested in objects, so wrap string values in {value: item}
          accountabilities: originalAccReqFieldsValue,
          optional_accountabilities: originalOptReqFieldsValue,
          education: originalMinReqFieldsValue,
          job_experience: originalRelWorkFieldsValue,
          security_screenings: originalSecurityScreeningsFieldsValue,
          behavioural_competencies: effectiveData?.behavioural_competencies || [],

          professional_registration: originalProfessionalRegistrationFieldsValue,
          preferences: originalPreferencesFieldsValue,
          knowledge_skills_abilities: originalKnowledgeSkillsAbilitiesFieldsValue,
          provisos: originalProvisosFieldsValue,
          optional_requirements: originalOptionalRequirementsFieldsValue,
        });
      }
      // setRenderKey((prevKey) => prevKey + 1);
      // console.log('reset!');
    }, [
      effectiveData,
      isLoading,
      classificationsData,
      reset,
      originalValuesSet,
      setOriginalAccReqFields,
      setOriginalMinReqFields,
      setOriginalOptReqFields,
      setOriginalOverview,
      setOriginalTitle,
      setOriginalValuesSet,
      originalOverview,
      originalTitle,
      originalAccReqFields,
      originalMinReqFields,
      originalOptReqFields,
      originalRelWorkFields,
      setOriginalRelWorkFields,
      originalSecurityScreeningsFields,
      setOriginalSecurityScreeningsFields,
      setOriginalProgramOverview,
      originalKnowledgeSkillsAbilitiesFields,
      originalPreferencesFields,
      originalProfessionalRegistrationFields,
      originalProvisosFields,
      setOriginalKnowledgeSkillsAbilitiesFields,
      setOriginalPreferencesFields,
      setOriginalProfessionalRegistrationFields,
      setOriginalProvisosFields,
      originalOptionalRequirementsFields,
      setOriginalOptionalRequirementsFields,
    ]);

    // Required Accountability Fields

    const {
      fields: acc_req_fields,
      append: acc_req_append,
      remove: acc_req_remove,
      update: acc_req_update,
    } = useFieldArray({
      control,
      name: 'accountabilities',
    });

    //     // Optional Accountability Fields
    const {
      fields: acc_opt_fields,
      append: acc_opt_append,
      remove: acc_opt_remove,
      update: acc_opt_update,
    } = useFieldArray({
      control,
      name: 'optional_accountabilities',
    });

    const {
      fields: education_fields,
      append: education_append,
      remove: education_remove,
      update: education_update,
    } = useFieldArray({
      control,
      name: 'education',
    });

    const {
      fields: job_experience_fields,
      append: job_experience_append,
      remove: job_experience_remove,
      update: job_experience_update,
    } = useFieldArray({
      control,
      name: 'job_experience',
    });

    const {
      fields: security_screenings_fields,
      append: security_screenings_append,
      remove: security_screenings_remove,
      update: security_screenings_update,
    } = useFieldArray({
      control,
      name: 'security_screenings',
    });

    const {
      fields: professional_registration_fields,
      append: professional_registration_append,
      remove: professional_registration_remove,
      update: professional_registration_update,
    } = useFieldArray({
      control,
      name: 'professional_registration',
    });

    const {
      fields: optional_requirements_fields,
      append: optional_requirements_append,
      remove: optional_requirements_remove,
      update: optional_requirements_update,
    } = useFieldArray({
      control,
      name: 'optional_requirements',
    });

    const {
      fields: preferences_fields,
      append: preferences_append,
      remove: preferences_remove,
      update: preferences_update,
    } = useFieldArray({
      control,
      name: 'preferences',
    });

    const {
      fields: knowledge_skills_abilities_fields,
      append: knowledge_skills_abilities_append,
      remove: knowledge_skills_abilities_remove,
      update: knowledge_skills_abilities_update,
    } = useFieldArray({
      control,
      name: 'knowledge_skills_abilities',
    });

    const {
      fields: provisos_fields,
      append: provisos_append,
      remove: provisos_remove,
      update: provisos_update,
    } = useFieldArray({
      control,
      name: 'provisos',
    });

    const {
      fields: behavioural_competencies_fields,
      append: behavioural_competencies_append,
      remove: behavioural_competencies_remove,
    } = useFieldArray({
      control,
      name: 'behavioural_competencies',
    });

    const { fields: classifications_fields } = useFieldArray({
      control,
      name: 'classifications',
    });

    // useImperativeHandle to expose the submitForm function
    useImperativeHandle(ref, () => ({
      // You can expose any method you need from the form instance here
      submit: () => {
        form.submit();
      },
      getFormData: () => {
        // This function could be used to get the current form data
        // console.log('form.getFieldsValue(): ', form.getFieldsValue());
        // return form.getFieldsValue();
        return getValues();
      },
      getFormErrors: () => {
        return formState.errors;
      },
    }));

    // FOCUS ALERTS
    // when user focuses on required accountabilities and minimum requirements fields, show an alert once
    // const { minReqAlertShown, setMinReqAlertShown } = useWizardContext();
    // const { relWorkAlertShown, setRelWorkAlertShown } = useWizardContext();
    // const { securityScreeningsAlertShown, setSecurityScreeningsAlertShown } = useWizardContext();

    // const { reqAlertShown, setReqAlertShown } = useWizardContext();

    // // Function to handle focus
    // const showMinReqModal = (action: () => void, showCancel: boolean) => {
    //   if (!minReqAlertShown) {
    //     setMinReqAlertShown(true);
    //     Modal.confirm({
    //       title: 'Attention',
    //       content: (
    //         <div role="alert">
    //           Significant changes to this area <strong>may</strong> trigger a classification review.
    //         </div>
    //       ),
    //       okText: 'Proceed',
    //       cancelText: 'Cancel',
    //       onOk: action,
    //       // The following props are set to style the modal like a warning
    //       icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    //       okButtonProps: { style: {} },
    //       cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
    //       autoFocusButton: null,
    //     });
    //   } else {
    //     action();
    //   }
    // };

    // const showRelWorkModal = (action: () => void, showCancel: boolean) => {
    //   if (!relWorkAlertShown) {
    //     setRelWorkAlertShown(true);
    //     Modal.confirm({
    //       title: 'Attention',
    //       content: (
    //         <div role="alert">
    //           Significant changes to this area <strong>may</strong> trigger a classification review.
    //         </div>
    //       ),
    //       okText: 'Proceed',
    //       cancelText: 'Cancel',
    //       onOk: action,
    //       // The following props are set to style the modal like a warning
    //       icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    //       okButtonProps: { style: {} },
    //       cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
    //       autoFocusButton: null,
    //     });
    //   } else {
    //     action();
    //   }
    // };

    // const showSecurityScreeningsModal = (action: () => void, showCancel: boolean) => {
    //   if (!securityScreeningsAlertShown) {
    //     setSecurityScreeningsAlertShown(true);
    //     Modal.confirm({
    //       title: 'Attention',
    //       content: (
    //         <div role="alert">
    //           Significant changes to this area <strong>may</strong> trigger a classification review.
    //         </div>
    //       ),
    //       okText: 'Proceed',
    //       cancelText: 'Cancel',
    //       onOk: action,
    //       // The following props are set to style the modal like a warning
    //       icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    //       okButtonProps: { style: {} },
    //       cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
    //       autoFocusButton: null,
    //     });
    //   } else {
    //     action();
    //   }
    // };

    // const showReqModal = (action: () => void, showCancel: boolean) => {
    //   if (!reqAlertShown) {
    //     setReqAlertShown(true);
    //     Modal.confirm({
    //       title: 'Attention',
    //       content: (
    //         <div role="alert">
    //           Removing required accountabilities <strong>may</strong> trigger a classification review
    //         </div>
    //       ),
    //       okText: 'Proceed',
    //       cancelText: 'Cancel',
    //       onOk: action,
    //       // The following props are set to style the modal like a warning
    //       icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    //       okButtonProps: { style: {} },
    //       cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
    //       autoFocusButton: null,
    //     });
    //   } else {
    //     action();
    //   }
    // };

    // DIFF HANDLING
    // Cross out deleted core items, allow ability to add back
    // Show fields that were edited

    // Required accountabilities
    const handleAccReqRemove = (index: number) => {
      const currentValues = getValues('accountabilities');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            acc_req_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        acc_req_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
        trigger();
      }
    };

    // Function to add back a removed field
    const handleAccReqAddBack = (index: number) => {
      const currentValues = getValues('accountabilities');
      acc_req_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleAccReqAddNew = () => {
      // adding as significant here because it needs to be sorted into regular accountabilities
      // instead of optional
      acc_req_append({ text: '', isCustom: true, disabled: false, is_significant: true });
      trigger();
    };

    const [editedAccReqFields, setEditedAccReqFields] = useState<{ [key: number]: boolean }>({});

    const renderAccReqFields = (field: any, index: number) => {
      const isEdited = editedAccReqFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedAccReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalAccReqFields[index]?.value }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove accountability ${index + 1}`
        : `Remove accountability ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <>
          {/* <div aria-live="polite" className="sr-only">
            {ariaLabel}
          </div> */}
          <List.Item
            key={field.id}
            style={{
              textDecoration: field.disabled ? 'line-through' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0px',
              borderBottom: 'none',
            }}
          >
            <FormItem name={`accountabilities.${index}.disabled`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`accountabilities.${index}.isCustom`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`accountabilities.${index}.is_significant`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`accountabilities.${index}.is_readonly`} control={control} hidden>
              <Input />
            </FormItem>

            {field.is_readonly && (
              <Typography.Text
                data-testid={`readonly-accountability-${index}`}
                style={{ flex: 1, marginRight: '10px' }}
              >
                {field.text}
              </Typography.Text>
            )}

            <Controller
              control={control}
              name={`accountabilities.${index}.text`}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <label className="sr-only" htmlFor={field.id}>
                    Accountability {index + 1}
                  </label>
                  <TextArea
                    // id for label
                    id={field.id}
                    // set style to display one if field.is_readonly
                    data-testid={`accountability-input-${index}`}
                    style={{ display: field.is_readonly ? 'none' : 'block' }}
                    autoSize
                    disabled={field.disabled || getValues(`accountabilities.${index}.is_readonly`)}
                    className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                    onChange={(event) => {
                      onChange(event);
                      const updatedValue = event.target.value;
                      handleFieldChange(index, updatedValue);
                    }}
                    onBlur={onBlur}
                    value={value ? (typeof value === 'string' ? value : value.value) : ''}
                  />
                </>
              )}
            />

            <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
              <Button
                data-testid={field.disabled ? `undo-remove-accountability-${index}` : `remove-accountability-${index}`}
                className="remove-item-btn"
                icon={icon}
                aria-label={ariaLabel}
                onClick={() => {
                  field.disabled ? handleAccReqAddBack(index) : handleAccReqRemove(index);
                }}
                disabled={field.is_readonly}
                style={{ marginLeft: '10px' }}
              />
            </Tooltip>
          </List.Item>
        </>
      );
    };

    // OPTIONAL ACCOUNTABILITIES DIFF
    const handleOptReqRemove = (index: number) => {
      const currentValues = getValues('optional_accountabilities');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            acc_opt_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        acc_opt_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
    };

    // Function to add back a removed field
    const handleOptReqAddBack = (index: number) => {
      const currentValues = getValues('optional_accountabilities');
      acc_opt_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleOptReqAddNew = () => {
      acc_opt_append({ value: '', isCustom: true, disabled: false });
    };

    const [editedOptReqFields, setEditedOptReqFields] = useState<{ [key: number]: boolean }>({});

    const renderOptReqFields = (field: any, index: number) => {
      const isEdited = editedOptReqFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedOptReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalOptReqFields[index]?.value }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove optional accountability ${index + 1}`
        : `Remove optional accountability ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <>
          {/* <div aria-live="polite" className="sr-only">
            {ariaLabel}
          </div> */}
          <List.Item
            key={field.id}
            style={{
              textDecoration: field.disabled ? 'line-through' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0px',
              borderBottom: 'none',
            }}
          >
            <FormItem name={`optional_accountabilities.${index}.disabled`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`optional_accountabilities.${index}.isCustom`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`optional_accountabilities.${index}.is_significant`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`optional_accountabilities.${index}.is_readonly`} control={control} hidden>
              <Input />
            </FormItem>

            <Controller
              control={control}
              name={`optional_accountabilities.${index}.text`}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <label className="sr-only" htmlFor={field.id}>
                    Optional accountability {index + 1}
                  </label>
                  <TextArea
                    id={field.id}
                    autoSize
                    disabled={field.disabled || getValues(`optional_accountabilities.${index}.is_readonly`)}
                    className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                    onChange={(event) => {
                      onChange(event);
                      const updatedValue = event.target.value;
                      handleFieldChange(index, updatedValue);
                    }}
                    onBlur={onBlur}
                    value={value ? (typeof value === 'string' ? value : value.value) : ''}
                  />
                </>
              )}
            />

            <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
              <Button
                className="remove-item-btn"
                icon={icon}
                aria-label={ariaLabel}
                onClick={() => {
                  field.disabled ? handleOptReqAddBack(index) : handleOptReqRemove(index);
                }}
                disabled={field.is_readonly}
                style={{ marginLeft: '10px' }}
              />
            </Tooltip>

            {/* {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                // acc_req_remove(index);
                handleOptReqAddBack(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          ) : (
            <Button
              icon={<DeleteOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                handleOptReqRemove(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          )} */}
          </List.Item>
        </>
      );
    };

    // EDUCATION REQUIREMENTS DIFF
    const handleMinReqRemove = (index: number) => {
      const currentValues = getValues('education');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            education_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        education_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleMinReqAddBack = (index: number) => {
      const currentValues = getValues('education');
      education_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleMinReqAddNew = () => {
      education_append({ text: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedMinReqFields, setEditedMinReqFields] = useState<{ [key: number]: boolean }>({});

    const renderMinReqFields = (field: any, index: number) => {
      const isEdited = editedMinReqFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedMinReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalMinReqFields[index]?.value }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove Education and work experience ${index + 1}`
        : `Remove Education and work experience ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <>
          {/* <div aria-live="polite" className="sr-only">
            {ariaLabel}
          </div> */}
          <List.Item
            key={field.id}
            style={{
              textDecoration: field.disabled ? 'line-through' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0px',
              borderBottom: 'none',
            }}
          >
            <FormItem name={`education.${index}.disabled`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`education.${index}.isCustom`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`education.${index}.is_significant`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`education.${index}.is_readonly`} control={control} hidden>
              <Input />
            </FormItem>

            {field.is_readonly && (
              <Typography.Text data-testid={`readonly-education-${index}`} style={{ flex: 1, marginRight: '10px' }}>
                {field.text}
              </Typography.Text>
            )}

            <Controller
              control={control}
              name={`education.${index}.text`}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <label className="sr-only" htmlFor={field.id}>
                    Education and work experience {index + 1}
                  </label>
                  <TextArea
                    data-testid={`education-input-${index}`}
                    id={field.id}
                    style={{ display: field.is_readonly ? 'none' : 'block' }}
                    autoSize
                    disabled={field.disabled || getValues(`education.${index}.is_readonly`)}
                    className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                    onChange={(event) => {
                      onChange(event);
                      const updatedValue = event.target.value;
                      handleFieldChange(index, updatedValue); // todo: find a way to eliminate this
                    }}
                    onBlur={onBlur}
                    value={value ? (typeof value === 'string' ? value : value.value) : ''}
                  />
                </>
              )}
            />

            <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
              <Button
                data-testid={field.disabled ? `undo-remove-education-${index}` : `remove-education-${index}`}
                className="remove-item-btn"
                icon={icon}
                aria-label={ariaLabel}
                onClick={() => {
                  field.disabled ? handleMinReqAddBack(index) : handleMinReqRemove(index);
                }}
                disabled={field.is_readonly}
                style={{ marginLeft: '10px' }}
              />
            </Tooltip>

            {/* {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                // showMinReqModal(() => {
                handleMinReqAddBack(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                // }, false)
              }}
            />
          ) : (
            <Tooltip title="Required" overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
              <Button
                disabled={field.is_readonly}
                icon={<DeleteOutlined style={{ color: '#000000' }} />}
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  // showMinReqModal(() => {
                  handleMinReqRemove(index);
                  // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                  // }, false)
                }}
              />
            </Tooltip>
          )} */}
          </List.Item>
        </>
      );
    };

    // RELATED EXPERIENCE DIFF
    const handleRelWorkRemove = (index: number) => {
      const currentValues = getValues('job_experience');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            job_experience_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        job_experience_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleRelWorkAddBack = (index: number) => {
      const currentValues = getValues('job_experience');
      job_experience_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleRelWorkAddNew = () => {
      job_experience_append({ text: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedRelWorkFields, setEditedRelWorkFields] = useState<{ [key: number]: boolean }>({});

    const renderRelWorkFields = (field: any, index: number) => {
      const isEdited = editedRelWorkFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedRelWorkFields((prev) => ({ ...prev, [index]: updatedValue !== originalRelWorkFields[index]?.value }));
        trigger();
      }, 300);

      // console.log('field', JSON.stringify(field));

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove related experience ${index + 1}`
        : `Remove related experience ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <>
          {/* <div aria-live="polite" className="sr-only">
            {ariaLabel}
          </div> */}
          <List.Item
            key={field.id}
            style={{
              textDecoration: field.disabled ? 'line-through' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0px',
              borderBottom: 'none',
            }}
          >
            <FormItem name={`job_experience.${index}.disabled`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`job_experience.${index}.isCustom`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`job_experience.${index}.is_significant`} control={control} hidden>
              <Input />
            </FormItem>
            <FormItem name={`job_experience.${index}.is_readonly`} control={control} hidden>
              <Input />
            </FormItem>

            {field.is_readonly && (
              <Typography.Text
                data-testid={`readonly-job-experience-${index}`}
                style={{ flex: 1, marginRight: '10px' }}
              >
                {field.text}
              </Typography.Text>
            )}

            <Controller
              control={control}
              name={`job_experience.${index}.text`}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <label className="sr-only" htmlFor={field.id}>
                    Related experience {index + 1}
                  </label>
                  <TextArea
                    data-testid={`job-experience-input-${index}`}
                    id={field.id}
                    style={{ display: field.is_readonly ? 'none' : 'block' }}
                    autoSize
                    disabled={field.disabled || getValues(`job_experience.${index}.is_readonly`)}
                    className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                    onChange={(event) => {
                      onChange(event);
                      const updatedValue = event.target.value;
                      handleFieldChange(index, updatedValue);
                    }}
                    onBlur={onBlur}
                    value={value ? (typeof value === 'string' ? value : value.value) : ''}
                  />
                </>
              )}
            />

            {/* <FormItem
            hidden={field.is_readonly}
            name={`job_experience.${index}.text`}
            control={control}
            style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
          >
            <TextArea
              autoSize
              disabled={field.disabled}
              className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
              // onFocus={() => showRelWorkModal(() => {}, false)}
              onChange={handleFieldChange}
            />
          </FormItem> */}

            <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
              <Button
                data-testid={field.disabled ? `undo-remove-job-experience-${index}` : `remove-job-experience-${index}`}
                className="remove-item-btn"
                icon={icon}
                aria-label={ariaLabel}
                onClick={() => {
                  field.disabled ? handleRelWorkAddBack(index) : handleRelWorkRemove(index);
                }}
                disabled={field.is_readonly}
                style={{ marginLeft: '10px' }}
              />
            </Tooltip>
          </List.Item>
        </>
      );
    };

    // SECURITY SCREENINGS DIFF
    const handleSecurityScreeningsRemove = (index: number) => {
      const currentValues = getValues('security_screenings');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            security_screenings_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        security_screenings_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleSecurityScreeningsAddBack = (index: number) => {
      const currentValues = getValues('security_screenings');
      security_screenings_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleSecurityScreeningsAddNew = () => {
      security_screenings_append({ text: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedSecurityScreeningsFields, setEditedSecurityScreeningsFields] = useState<{ [key: number]: boolean }>(
      {},
    );

    const renderSecurityScreeningsFields = (field: any, index: number) => {
      const isEdited = editedSecurityScreeningsFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedSecurityScreeningsFields((prev) => ({
          ...prev,
          [index]: updatedValue !== originalSecurityScreeningsFields[index]?.value,
        }));
        trigger();
      }, 300);
      // console.log('field', JSON.stringify(field));

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove security screening ${index + 1}`
        : `Remove security screening ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <List.Item
          key={field.id}
          style={{
            textDecoration: field.disabled ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`security_screenings.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`security_screenings.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`security_screenings.${index}.is_readonly`} control={control} hidden>
            <Input />
          </FormItem>

          {field.is_readonly && (
            <Typography.Text
              data-testid={`readonly-security-screening-${index}`}
              style={{ flex: 1, marginRight: '10px' }}
            >
              {field.text}
            </Typography.Text>
          )}

          <Controller
            control={control}
            name={`security_screenings.${index}.text`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Security screening {index + 1}
                </label>
                <TextArea
                  data-testid={`security-screening-input-${index}`}
                  id={field.id}
                  style={{ display: field.is_readonly ? 'none' : 'block' }}
                  autoSize
                  disabled={field.disabled || getValues(`security_screenings.${index}.is_readonly`)}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={onBlur}
                  value={value ? (typeof value === 'string' ? value : value.value) : ''}
                />
              </>
            )}
          />

          <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={
                field.disabled ? `undo-remove-security-screening-${index}` : `remove-security-screening-${index}`
              }
              className="remove-item-btn"
              icon={icon}
              aria-label={ariaLabel}
              onClick={() => {
                field.disabled ? handleSecurityScreeningsAddBack(index) : handleSecurityScreeningsRemove(index);
              }}
              disabled={field.is_readonly}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
            />
          </Tooltip>
        </List.Item>
      );
    };

    // PROFESSIONAL REGISTRATION DIFF
    const handleProfessionalRegistrationRemove = (index: number) => {
      const currentValues = getValues('professional_registration');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            professional_registration_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        professional_registration_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleProfessionalRegistrationAddBack = (index: number) => {
      const currentValues = getValues('professional_registration');
      professional_registration_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleProfessionalRegistrationAddNew = () => {
      professional_registration_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedProfessionalRegistrationFields, setEditedProfessionalRegistrationFields] = useState<{
      [key: number]: boolean;
    }>({});

    const renderProfessionalRegistrationFields = (field: any, index: number) => {
      const isEdited = editedProfessionalRegistrationFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedProfessionalRegistrationFields((prev) => ({
          ...prev,
          [index]: updatedValue !== originalProfessionalRegistrationFields[index]?.value,
        }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove professional registration requirement ${index + 1}`
        : `Remove professional registration requirement ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <List.Item
          key={field.id}
          style={{
            textDecoration: field.disabled ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`professional_registration.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`professional_registration.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Controller
            control={control}
            name={`professional_registration.${index}.value`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Professional registration {index + 1}
                </label>
                <TextArea
                  data-testid={`professional-registration-input-${index}`}
                  id={field.id}
                  autoSize
                  disabled={field.disabled}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              </>
            )}
          />

          <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={
                field.disabled
                  ? `undo-remove-professional-registration-${index}`
                  : `remove-professional-registration-${index}`
              }
              className="remove-item-btn"
              icon={icon}
              aria-label={ariaLabel}
              onClick={() => {
                field.disabled
                  ? handleProfessionalRegistrationAddBack(index)
                  : handleProfessionalRegistrationRemove(index);
              }}
              disabled={field.is_readonly}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
            />
          </Tooltip>

          {/* {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                handleProfessionalRegistrationAddBack(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          ) : (
            <Button
              icon={<DeleteOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                handleProfessionalRegistrationRemove(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          )} */}
        </List.Item>
      );
    };

    // OPTIONAL REQUIREMENTS DIFF
    const handleOptionalRequirementsRemove = (index: number) => {
      const currentValues = getValues('optional_requirements');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            optional_requirements_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        optional_requirements_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleOptionalRequirementsAddBack = (index: number) => {
      const currentValues = getValues('optional_requirements');
      optional_requirements_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleOptionalRequirementsAddNew = () => {
      optional_requirements_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedOptionalRequirementsFields, setEditedOptionalRequirementsFields] = useState<{
      [key: number]: boolean;
    }>({});

    const renderOptionalRequirementsFields = (field: any, index: number) => {
      const isEdited = editedOptionalRequirementsFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedOptionalRequirementsFields((prev) => ({
          ...prev,
          [index]: updatedValue !== originalOptionalRequirementsFields[index]?.value,
        }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove optional requirement ${index + 1}`
        : `Remove optional requirement ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <List.Item
          key={field.id}
          style={{
            textDecoration: field.disabled ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`optional_requirements.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`optional_requirements.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Controller
            control={control}
            name={`optional_requirements.${index}.value`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Optional requirement {index + 1}
                </label>
                <TextArea
                  data-testid={`optional-requirement-input-${index}`}
                  id={field.id}
                  autoSize
                  disabled={field.disabled}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              </>
            )}
          />

          <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={
                field.disabled ? `undo-remove-optional-requirement-${index}` : `remove-optional-requirement-${index}`
              }
              className="remove-item-btn"
              icon={icon}
              aria-label={ariaLabel}
              onClick={() => {
                field.disabled ? handleOptionalRequirementsAddBack(index) : handleOptionalRequirementsRemove(index);
              }}
              disabled={field.is_readonly}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
            />
          </Tooltip>
        </List.Item>
      );
    };

    // PREFERENCES DIFF
    const handlePreferencesRemove = (index: number) => {
      const currentValues = getValues('preferences');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            preferences_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        preferences_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handlePreferencesAddBack = (index: number) => {
      const currentValues = getValues('preferences');
      preferences_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handlePreferencesAddNew = () => {
      preferences_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedPreferencesFields, setEditedPreferencesFields] = useState<{ [key: number]: boolean }>({});

    const renderPreferencesFields = (field: any, index: number) => {
      const isEdited = editedPreferencesFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedPreferencesFields((prev) => ({
          ...prev,
          [index]: updatedValue !== originalPreferencesFields[index]?.value,
        }));
        trigger();
      }, 300);
      // console.log('field', JSON.stringify(field)); Job preferences

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove job preference ${index + 1}`
        : `Remove job preference ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <List.Item
          key={field.id}
          style={{
            textDecoration: field.disabled ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`preferences.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`preferences.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Controller
            control={control}
            name={`preferences.${index}.value`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Job preference {index + 1}
                </label>
                <TextArea
                  data-testid={`preference-input-${index}`}
                  id={field.id}
                  autoSize
                  disabled={field.disabled}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              </>
            )}
          />

          <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={field.disabled ? `undo-remove-preference-${index}` : `remove-preference-${index}`}
              className="remove-item-btn"
              icon={icon}
              aria-label={ariaLabel}
              onClick={() => {
                field.disabled ? handlePreferencesAddBack(index) : handlePreferencesRemove(index);
              }}
              disabled={field.is_readonly}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
            />
          </Tooltip>

          {/* {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                handlePreferencesAddBack(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          ) : (
            <Button
              icon={<DeleteOutlined style={{ color: '#000000' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                handlePreferencesRemove(index);
                // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          )} */}
        </List.Item>
      );
    };

    // KNOWLEDGE SKILL ABILITIES DIFF
    const handleKnowledgeSkillsAbilitiesRemove = (index: number) => {
      const currentValues = getValues('knowledge_skills_abilities');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            knowledge_skills_abilities_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        knowledge_skills_abilities_update(index, {
          ...(currentValues[index] as TrackedFieldArrayItem),
          disabled: true,
        });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleKnowledgeSkillsAbilitiesAddBack = (index: number) => {
      const currentValues = getValues('knowledge_skills_abilities');
      knowledge_skills_abilities_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleKnowledgeSkillsAbilitiesAddNew = () => {
      knowledge_skills_abilities_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedKnowledgeSkillsAbilitiesFields, setEditedKnowledgeSkillsAbilitiesFields] = useState<{
      [key: number]: boolean;
    }>({});

    const renderKnowledgeSkillsAbilitiesFields = (field: any, index: number) => {
      const isEdited = editedKnowledgeSkillsAbilitiesFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedKnowledgeSkillsAbilitiesFields((prev) => ({
          ...prev,
          [index]: updatedValue !== originalKnowledgeSkillsAbilitiesFields[index]?.value,
        }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove knowledge, skill or ability ${index + 1}`
        : `Remove knowledge, skill or ability ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <List.Item
          key={field.id}
          style={{
            textDecoration: field.disabled ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`knowledge_skills_abilities.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`knowledge_skills_abilities.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Controller
            control={control}
            name={`knowledge_skills_abilities.${index}.value`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Knowledge, skill or ability {index + 1}
                </label>
                <TextArea
                  data-testid={`knowledge-skills-ability-input-${index}`}
                  id={field.id}
                  autoSize
                  disabled={field.disabled}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              </>
            )}
          />
          <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={
                field.disabled
                  ? `undo-remove-knowledge-skills-ability-${index}`
                  : `remove-knowledge-skills-ability-${index}`
              }
              className="remove-item-btn"
              icon={icon}
              aria-label={ariaLabel}
              onClick={() => {
                field.disabled
                  ? handleKnowledgeSkillsAbilitiesAddBack(index)
                  : handleKnowledgeSkillsAbilitiesRemove(index);
              }}
              disabled={field.is_readonly}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
            />
          </Tooltip>
        </List.Item>
      );
    };

    // PROVISOS DIFF
    const handleProvisosRemove = (index: number) => {
      const currentValues = getValues('provisos');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            provisos_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        provisos_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleProvisosAddBack = (index: number) => {
      const currentValues = getValues('provisos');
      provisos_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleProvisosAddNew = () => {
      provisos_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedProvisosFields, setEditedProvisosFields] = useState<{ [key: number]: boolean }>({});

    const renderProvisosFields = (field: any, index: number) => {
      const isEdited = editedProvisosFields[index] || field.isCustom;

      const handleFieldChange = debounce((index, updatedValue) => {
        setEditedProvisosFields((prev) => ({
          ...prev,
          [index]: updatedValue !== originalProvisosFields[index]?.value,
        }));
        trigger();
      }, 300);

      const icon = field.disabled ? (
        <PlusOutlined style={{ color: '#000000' }} />
      ) : (
        <DeleteOutlined style={{ color: '#000000' }} />
      );
      const ariaLabel = field.disabled
        ? `Undo remove willingness statements or proviso ${index + 1}`
        : `Remove willingness statements or proviso ${index + 1}`;
      const tooltipTitle = field.is_readonly ? 'Required' : '';

      return (
        <List.Item
          key={field.id}
          style={{
            textDecoration: field.disabled ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`provisos.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`provisos.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Controller
            control={control}
            name={`provisos.${index}.value`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Willingness statements or proviso {index + 1}
                </label>
                <TextArea
                  data-testid={`proviso-input-${index}`}
                  id={field.id}
                  autoSize
                  disabled={field.disabled}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              </>
            )}
          />
          <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={field.disabled ? `undo-remove-proviso-${index}` : `remove-proviso-${index}`}
              className="remove-item-btn"
              icon={icon}
              aria-label={ariaLabel}
              onClick={() => {
                field.disabled ? handleProvisosAddBack(index) : handleProvisosRemove(index);
              }}
              disabled={field.is_readonly}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
            />
          </Tooltip>
        </List.Item>
      );
    };
    // TITLE DIFF

    const [titleEdited, setTitleEdited] = useState<boolean>(false);

    const renderTitle = (field: any) => {
      if (!field) return null;

      const isEdited = titleEdited || field.isCustom;

      const handleFieldChange = (event: any) => {
        const updatedValue = event.target.value;
        setTitleEdited(() => updatedValue !== originalTitle?.value);
      };

      return (
        <>
          <FormItem name={`title.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`title.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Card title="Job title" bordered={false} className="custom-card">
            <section aria-label="Job title" role="region">
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="title.value"
                    control={control}
                    colon={false}
                  >
                    <Input
                      data-testid="job-title-input"
                      placeholder="Ex.: Program Assistant"
                      aria-label="Job Title"
                      className={`${isEdited ? 'edited-textarea' : ''}`}
                      onChange={handleFieldChange}
                    />
                  </FormItem>
                  <label className="sr-only" htmlFor="title.value">
                    Job title
                  </label>
                </Col>
              </Row>
            </section>
          </Card>
        </>
      );
    };

    // OVERVIEW DIFF

    const [overviewEdited, setOverviewEdited] = useState<boolean>(false);

    const renderOverview = (field: any) => {
      if (!field) return null;

      const isEdited = overviewEdited || field.isCustom;

      const handleFieldChange = (event: any) => {
        const updatedValue = event.target.value;
        setOverviewEdited(() => updatedValue !== originalOverview?.value);
      };

      return (
        <>
          <FormItem name={`overview.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`overview.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Card title="Job overview" bordered={false} className="custom-card" style={{ marginTop: 16 }}>
            <section aria-label="Job overview" role="region">
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="overview.value"
                    control={control}
                    colon={false}
                  >
                    <TextArea
                      data-testid="job-overview-input"
                      autoSize
                      className={`${isEdited ? 'edited-textarea' : ''}`}
                      onChange={handleFieldChange}
                    />
                  </FormItem>
                  <label className="sr-only" htmlFor="overview.value">
                    Job overview
                  </label>
                </Col>
              </Row>
            </section>
          </Card>
        </>
      );
    };

    // PROGRAM OVERVIEW

    const [programOverviewEdited, setProgramOverviewEdited] = useState<boolean>(false);

    const renderProgramOverview = (field: any) => {
      // console.log('renderProgramOverview: ', field);
      if (!field) return null;

      const isEdited = programOverviewEdited || field.isCustom;

      const handleFieldChange = (event: any) => {
        const updatedValue = event.target.value;
        setProgramOverviewEdited(() => updatedValue !== originalProgramOverview?.value);
      };

      return (
        <>
          <FormItem name={`program_overview.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`program_overview.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <Card title="Program overview" bordered={false} className="custom-card" style={{ marginTop: 16 }}>
            <section aria-label="Program overview" role="region">
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="program_overview.value"
                    control={control}
                    colon={false}
                  >
                    <TextArea
                      data-testid="program-overview-input"
                      autoSize
                      className={`${isEdited ? 'edited-textarea' : ''}`}
                      onChange={handleFieldChange}
                      maxLength={320}
                      placeholder="(Optional) Add more details about the program"
                    />
                  </FormItem>
                  <label className="sr-only" htmlFor="program_overview.value">
                    Program overview
                  </label>
                  <Typography.Paragraph type="secondary" style={{ textAlign: 'right', width: '100%', margin: '0' }}>
                    {(getValues('program_overview.value') as string).length} / 320
                  </Typography.Paragraph>
                </Col>
              </Row>
            </section>
          </Card>
        </>
      );
    };

    // DIFFS DONE

    const [getPositionProfile, { data: positionProfileData, isFetching: isFetchingPositionProfile }] =
      useLazyGetPositionProfileQuery();

    const { data: positionRequestData } = useGetPositionRequestQuery({
      id: positionRequestId ? positionRequestId : -1,
    });

    useEffect(() => {
      if (positionRequestData?.positionRequest?.reports_to_position_id) {
        getPositionProfile({ positionNumber: positionRequestData.positionRequest.reports_to_position_id.toString() });
      }
    }, [positionRequestData, getPositionProfile]);

    const [firstActivePosition, setFirstActivePosition] = useState<PositionProfileModel>();
    const [additionalPositions, setAdditionalPositions] = useState(0);

    useEffect(() => {
      if (positionProfileData && positionProfileData.positionProfile) {
        const activePositions = positionProfileData.positionProfile.filter((p) => p.status === 'Active');
        setFirstActivePosition(activePositions[0] || null);

        // Set state to the number of additional active positions
        setAdditionalPositions(positionProfileData.positionProfile.length - 1);
      }
    }, [positionProfileData]);

    if (isLoading) {
      return <LoadingSpinnerWithMessage />;
    }

    const titleStyle = {
      fontSize: '24px', // Adjust the font size as needed
      color: 'rgba(0, 0, 0, 0.85)', // This is the default color for antd titles
      marginBottom: '0px', // Adjust spacing as needed
      fontWeight: '500', // Default font weight for antd titles
    };

    const addStyle = {
      padding: 0,
      height: 'auto',
      lineHeight: 'inherit',
      marginTop: '5px',
      marginBottom: '1rem',
      display: 'block',
    };

    // console.log('effectiveData: ', effectiveData);

    return (
      <>
        <Row data-testid="profile-editing-form" gutter={[24, 24]}>
          <Col xs={24} sm={24} lg={8} aria-label="Context and job details" role="region">
            <Alert
              role="note"
              type="info"
              showIcon
              message={
                <span>
                  Job context{' '}
                  <Tooltip title="The job context is important to understand as you proceed to create the position. You will be asked prior to approving that you understand the context of the job.">
                    <InfoCircleOutlined style={{ cursor: 'pointer', fontSize: '0.9rem' }} />
                  </Tooltip>
                </span>
              }
              description={
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof effectiveData?.context === 'string'
                        ? effectiveData?.context
                        : effectiveData?.context?.description ?? '',
                    ),
                  }}
                ></p>
              }
            ></Alert>
            <Descriptions
              className="customDescriptions"
              style={{ marginTop: '1rem' }}
              title={
                <div>
                  Job Details
                  {/* <Tooltip title="Some reasons...">
                    <a href="#" style={{ marginLeft: 8 }}>
                      Why can't I make changes?
                      <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                    </a>
                  </Tooltip> */}
                </div>
              }
              bordered
              column={1}
            >
              <Descriptions.Item label="Expected classification">
                {effectiveData?.classifications?.[0]?.classification?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Reporting manager">
                {isFetchingPositionProfile && <LoadingSpinnerWithMessage mode="small" />}
                {firstActivePosition && !isFetchingPositionProfile && (
                  <div>
                    <p
                      style={{ margin: 0 }}
                    >{`${firstActivePosition.employeeName}, ${firstActivePosition.ministry}`}</p>
                    <Typography.Paragraph type="secondary">
                      {`${firstActivePosition.positionDescription}, ${firstActivePosition.classification}`}
                      <br></br>
                      {`Position No.: ${firstActivePosition.positionNumber}`}
                      {additionalPositions > 0 && ` +${additionalPositions}`}
                    </Typography.Paragraph>
                  </div>
                )}
                {!firstActivePosition && !isFetchingPositionProfile && (
                  <div>Position {positionRequestData?.positionRequest?.reports_to_position_id} is unoccupied</div>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Job Store #">{effectiveData?.number}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} sm={24} lg={16}>
            <Form
              form={form}
              // key={renderKey}
              onFinish={handleSubmit((data) => {
                // console.log('onFinish: ', data);
                submitHandler?.(data);
              })}
            >
              {/*         
        <Button
          onClick={() => {
            setRenderKey((prevKey) => {
              console.log('prevKey: ', prevKey);
              return prevKey + 1;
            }); // Fixes issue where deleting item doesn't render properly
          }}
        >
          Re-render
        </Button> */}

              <FormItem name="id" control={control} hidden>
                <Input />
              </FormItem>

              <FormItem name="number" control={control} hidden>
                <Input />
              </FormItem>

              {/* {effectiveData?.classifications?.map((c, index) => {
            console.log('hidden classifications field: ', c.classification.id);
            return (
              <FormItem key={index} name={`classifications[${index}].classification.id`} control={control} hidden>
                <Input />
              </FormItem>
            );
          })} */}

              <List
                style={{ display: 'none' }}
                dataSource={classifications_fields}
                renderItem={(field, index) => (
                  <List.Item
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start', // Align items to the top
                      marginBottom: '0px',
                      borderBottom: 'none',

                      padding: '5px 0',
                    }}
                    key={field.id} // Ensure this is a unique value
                  >
                    {/* Hidden fields to submit actual data */}
                    <FormItem name={`classifications.${index}.classification`} control={control} hidden>
                      <Input />
                    </FormItem>
                  </List.Item>
                )}
              />

              <FormItem name="context" control={control} hidden>
                <Input />
              </FormItem>

              {!config?.contextEditable ? (
                <Alert
                  type="info"
                  role="note"
                  style={{ marginBottom: '24px' }}
                  message="Some fields are standard and cannot be edited, others are marked as significant and may result in a classification request.  Those not marked as significant or shaded, may be edited without a classification impact."
                  showIcon
                />
              ) : (
                <></>
              )}
              {!config?.classificationEditable ? (
                // <div style={{ marginBottom: '24px' }}>
                //   <Title level={4} style={titleStyle}>
                //     Classification - {effectiveData?.classifications?.map((c) => c.classification.code).join(', ')}
                //   </Title>
                // </div>
                <></>
              ) : (
                <></>
              )}

              {renderTitle(getValues('title'))}

              {renderProgramOverview(getValues('program_overview'))}

              {config?.classificationEditable ? (
                <></>
              ) : (
                // todo: allow multiple classificaton editing
                // <FormItem name="classification" control={control} label="Classification">
                //   <Select {...register('classification')}>
                //     {classificationsData?.classifications.map((classification: ClassificationModel) => (
                //       <Select.Option value={classification.id} key={classification.id}>
                //         {`${classification.code}`}
                //       </Select.Option>
                //     ))}
                //   </Select>
                // </FormItem>
                <></>
              )}

              {config?.contextEditable ? (
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="context"
                  control={control}
                  colon={false}
                  label={<span style={titleStyle}>Context</span>}
                >
                  <TextArea autoSize />
                </FormItem>
              ) : (
                <></>
              )}
              {renderOverview(getValues('overview'))}

              <Card title="Accountabilities" className="custom-card" style={{ marginTop: 16 }}>
                <section aria-label="Accountabilities" role="region">
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Alert
                        role="note"
                        style={{ marginBottom: '10px' }}
                        message={
                          <>
                            Choose from the provided list of accountabilities to avoid the review by the classification
                            team and create your position right away
                          </>
                        }
                        type="warning"
                        showIcon
                      />

                      <>
                        {acc_req_fields.length > 0 && (
                          <AccessibleList
                            dataSource={acc_req_fields}
                            renderItem={renderAccReqFields}
                            ariaLabel="Accountabilities"
                          />
                        )}
                        <Button
                          data-testid="add-accountability-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handleAccReqAddNew();
                            // setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                          }}
                        >
                          Add another accountability
                        </Button>
                      </>

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Optional accountabilities"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {acc_opt_fields.length > 0 && (
                          <AccessibleList
                            dataSource={acc_opt_fields}
                            renderItem={renderOptReqFields}
                            ariaLabel="Optional Accountabilities"
                          />
                        )}
                        <Button
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handleOptReqAddNew();
                            // setRenderKey((prevKey) => prevKey + 1);
                          }}
                        >
                          Add optional accountability
                        </Button>
                      </>
                    </Col>
                  </Row>
                </section>
              </Card>

              <Card title="Minimum job requirements" className="custom-card" style={{ marginTop: 16 }}>
                <section aria-label="Minimum job requirements" role="region">
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Alert
                        role="note"
                        style={{ marginBottom: '10px' }}
                        message={
                          <>
                            Keep the minimum job requirements to avoid the review by the classification team and create
                            your position right away
                          </>
                        }
                        type="warning"
                        showIcon
                      />

                      <Form.Item
                        label="Education and work experience"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <Typography.Paragraph type="secondary">
                        Minimum years of experience are required, and you may add or refine the education requirements
                        (add a degree or diploma program). These equivalencies are designed to be inclusive of different
                        backgrounds.
                      </Typography.Paragraph>

                      <>
                        {education_fields.length > 0 && (
                          // <List dataSource={education_fields} renderItem={renderMinReqFields} />
                          <AccessibleList
                            dataSource={education_fields}
                            renderItem={renderMinReqFields}
                            ariaLabel="Education and work experience"
                          />
                        )}
                        <Button
                          data-testid="add-education-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            {
                              // showMinReqModal(() => {
                              handleMinReqAddNew();
                              // setRenderKey((prevKey) => prevKey + 1);
                              // }, false);
                            }
                          }}
                        >
                          Add an education or work requirement
                        </Button>
                      </>

                      {/* Related experience */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Related experience"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {job_experience_fields.length > 0 && (
                          <AccessibleList
                            dataSource={job_experience_fields}
                            renderItem={renderRelWorkFields}
                            ariaLabel="Related experience"
                          />
                        )}
                        <Button
                          data-testid="add-job-experience-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            {
                              // showRelWorkModal(() => {
                              handleRelWorkAddNew();
                              // setRenderKey((prevKey) => prevKey + 1);
                              // }, false);
                            }
                          }}
                        >
                          Add a related experience
                        </Button>
                      </>

                      {/* Professional registration requirements */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Professional registration requirements"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <Typography.Paragraph type="secondary">
                        Professional registration is required for a number of positions in the BC Public Service. You
                        can add those requirements here.
                      </Typography.Paragraph>

                      <>
                        {professional_registration_fields.length > 0 && (
                          // <List
                          //   dataSource={professional_registration_fields}
                          //   renderItem={renderProfessionalRegistrationFields}
                          // />
                          <AccessibleList
                            dataSource={professional_registration_fields}
                            renderItem={renderProfessionalRegistrationFields}
                            ariaLabel="Professional registration requirements"
                          />
                        )}
                        <Button
                          data-testid="add-professional-registration-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handleProfessionalRegistrationAddNew();
                            // setRenderKey((prevKey) => prevKey + 1);
                          }}
                        >
                          Add a professional registration requirement
                        </Button>
                      </>

                      {/* Preferences */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Preferences"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {preferences_fields.length > 0 && (
                          <AccessibleList
                            dataSource={preferences_fields}
                            renderItem={renderPreferencesFields}
                            ariaLabel="Job preferences"
                          />
                        )}
                        <Button
                          data-testid="add-preference-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handlePreferencesAddNew();
                            // setRenderKey((prevKey) => prevKey + 1);
                          }}
                        >
                          Add a job preference
                        </Button>
                      </>

                      {/* Knowledge, skills and abilities */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Knowledge, skills and abilities"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {knowledge_skills_abilities_fields.length > 0 && (
                          <AccessibleList
                            dataSource={knowledge_skills_abilities_fields}
                            renderItem={renderKnowledgeSkillsAbilitiesFields}
                            ariaLabel="Knowledge, skills and abilities"
                          />
                        )}
                        <Button
                          data-testid="add-knowledge-skills-ability-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handleKnowledgeSkillsAbilitiesAddNew();
                            // setRenderKey((prevKey) => prevKey + 1);
                          }}
                        >
                          Add a knowledge, skill or ability requirement
                        </Button>
                      </>

                      {/* Willingness statements or provisos */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Willingness statements or provisos"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {provisos_fields.length > 0 && (
                          <AccessibleList
                            dataSource={provisos_fields}
                            renderItem={renderProvisosFields}
                            ariaLabel="Willingness statements or provisos"
                          />
                        )}
                        <Button
                          data-testid="add-proviso-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handleProvisosAddNew();
                            // setRenderKey((prevKey) => prevKey + 1);
                          }}
                        >
                          Add a proviso
                        </Button>
                      </>

                      {/* Security screenings */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Security screenings"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {security_screenings_fields.length > 0 && (
                          <AccessibleList
                            dataSource={security_screenings_fields}
                            renderItem={renderSecurityScreeningsFields}
                            ariaLabel="Security screenings"
                          />
                        )}
                        <Button
                          data-testid="add-security-screening-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            {
                              // showSecurityScreeningsModal(() => {
                              handleSecurityScreeningsAddNew();
                              // setRenderKey((prevKey) => prevKey + 1);
                              // }, false);
                            }
                          }}
                        >
                          Add another security screening
                        </Button>
                      </>

                      {/* Optional requirements */}

                      <Divider className="hr-reduced-margin" />

                      <Form.Item
                        label="Optional requirements"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                        colon={false}
                      ></Form.Item>

                      <>
                        {optional_requirements_fields.length > 0 && (
                          <AccessibleList
                            dataSource={optional_requirements_fields}
                            renderItem={renderOptionalRequirementsFields}
                            ariaLabel="Optional requirements"
                          />
                        )}
                        <Button
                          data-testid="add-optional-requirement-button"
                          type="link"
                          icon={<PlusOutlined aria-hidden />}
                          style={addStyle}
                          onClick={() => {
                            handleOptionalRequirementsAddNew();
                            // setRenderKey((prevKey) => prevKey + 1);
                          }}
                        >
                          Add an optional requirement
                        </Button>
                      </>
                    </Col>
                  </Row>
                </section>
              </Card>

              <Card title="Behavioural competencies" className="custom-card" style={{ marginTop: 16 }}>
                <section aria-label="Behavioural competencies" role="region">
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <>
                        <div data-testid="behavioral-competencies-selector">
                          <BehaviouralComptencyPicker
                            onAdd={behavioural_competencies_append}
                            onRemove={behavioural_competencies_remove}
                            behavioural_competencies_fields={behavioural_competencies_fields}
                          />
                        </div>
                        <Typography.Text type="secondary">
                          * denotes an Indigenous Behavioural Competency
                        </Typography.Text>

                        <List
                          style={{ marginTop: '7px' }}
                          locale={{ emptyText: ' ' }}
                          dataSource={behavioural_competencies_fields}
                          renderItem={(field, index) => (
                            <List.Item
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start', // Align items to the top
                                marginBottom: '0px',
                                borderBottom: 'none',

                                padding: '5px 0',
                              }}
                              key={field.id} // Ensure this is a unique value
                            >
                              {/* Display behavioural competency name and description */}
                              <p style={{ flex: 1, marginRight: '10px', marginBottom: 0 }}>
                                <strong>
                                  {field.behavioural_competency.name}
                                  <IsIndigenousCompetency competency={field.behavioural_competency} />
                                </strong>
                                : {field.behavioural_competency.description}
                              </p>

                              {/* Trash icon/button for deletion */}
                              <Button
                                data-testid={`remove-behavioral-competency-${index}`}
                                type="text" // No button styling, just the icon
                                aria-label={`Remove ${field.behavioural_competency.name} behavioural competency`}
                                icon={<DeleteOutlined aria-hidden />}
                                onClick={() => {
                                  behavioural_competencies_remove(index);
                                  // setRenderKey((prevKey) => prevKey + 1);
                                }}
                                style={{ marginLeft: '10px', border: '1px solid', borderColor: '#d9d9d9' }}
                              />

                              {/* Hidden fields to submit actual data */}
                              <FormItem
                                name={`behavioural_competencies.${index}.behavioural_competency.id`}
                                control={control}
                                hidden
                              >
                                <Input />
                              </FormItem>
                              <FormItem
                                hidden
                                name={`behavioural_competencies.${index}.behavioural_competency.name`}
                                control={control}
                                style={{ flex: 1, marginRight: '10px' }}
                              >
                                <Input placeholder="Name" style={{ width: '100%' }} />
                              </FormItem>
                              <FormItem
                                hidden
                                name={`behavioural_competencies.${index}.behavioural_competency.description`}
                                control={control}
                                style={{ flex: 2, marginRight: '10px' }}
                              >
                                <TextArea placeholder="Description" style={{ width: '100%' }} />
                              </FormItem>
                            </List.Item>
                          )}
                        />

                        {/* {isPickerVisible ? ( */}

                        {/* ) : ( */}
                        {/* <Button
                          type="link"
                          icon={<PlusOutlined />}
                          style={{ ...addStyle, marginTop: '10px' }}
                          onClick={() => setPickerVisible(true)} // Show picker when "Add" button is clicked
                        >
                          Add a behavioural competency
                        </Button> */}
                        {/* )} */}
                      </>
                    </Col>
                  </Row>
                </section>
              </Card>
            </Form>
          </Col>
        </Row>
      </>
    );
  },
);

export default WizardEditProfile;
