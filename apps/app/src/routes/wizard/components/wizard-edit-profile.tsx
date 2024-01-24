/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Alert, Button, Col, Form, Input, List, Modal, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useLazyGetClassificationsQuery } from '../../../redux/services/graphql-api/classification.api';
import {
  GetClassificationsResponse,
  JobProfileModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { IsIndigenousCompetency } from './is-indigenous-competency.component';
import BehaviouralComptencyPicker, { BehaviouralCompetencyData } from './wizard-behavioural-comptency-picker';
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
  setErrors: (errors: string[]) => void;
}

const WizardEditProfile = forwardRef(
  (
    { id, profileData, config, submitHandler, receivedClassificationsDataCallback, setErrors }: WizardEditProfileProps,
    ref,
  ) => {
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

    useEffect(() => {
      setErrors(
        Object.values(formState.errors).map((error: any) => {
          const message =
            error.message != null
              ? error.message
              : error.root != null
                ? error.root?.message
                : error.value != null
                  ? error.value.message
                  : 'Error';
          return message;
        }),
      );
    }, [formState.errors, formState.isValid, formState.isValidating, getValues, setErrors]);

    // todo: usage of this approach is undesirable, however it fixes various render issues
    // that appear to be linked with the custom FormItem component. Ideally eliminate the usage
    // of this state
    const [renderKey, setRenderKey] = useState(0);
    useEffect(() => {
      form.resetFields(); // "form" is needed to use with ref and to get the state. Must do "resetFields"
      // as part of the render hack. todo: get rid of this if possible
    }, [renderKey, form]);

    const {
      originalValuesSet,
      setOriginalValuesSet,
      originalOverview,
      setOriginalOverview,
      originalTitle,
      setOriginalTitle,
      originalMinReqFields,
      setOriginalMinReqFields,
      originalAccReqFields,
      setOriginalAccReqFields,
      originalOptReqFields,
      setOriginalOptReqFields,
    } = useWizardContext();

    useEffect(() => {
      if (effectiveData && !isLoading && classificationsData) {
        const classificationIds =
          effectiveData?.classifications?.map((c) => ({ classification: c.classification.id })) ?? [];

        const originalAccReqFieldsValue = effectiveData.accountabilities.required.map((item) => {
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

        if (!originalValuesSet) setOriginalAccReqFields(originalAccReqFieldsValue);

        // Initialize an object to track the edit status of each field
        let initialEditStatus: { [key: number]: boolean } = {};

        // Iterate over each minimum requirement field and compare with the original value
        originalAccReqFieldsValue.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalAccReqFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedMinReqFields state
        setEditedAccReqFields(initialEditStatus);

        const originalOptReqFieldsValue = effectiveData.accountabilities.optional.map((item) => {
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
        if (!originalValuesSet) setOriginalOptReqFields(originalOptReqFieldsValue);

        // Iterate over each minimum requirement field and compare with the original value
        originalOptReqFieldsValue.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalOptReqFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedMinReqFields state
        setEditedOptReqFields(initialEditStatus);

        const originalMinReqFieldsValue = effectiveData.requirements.map((item) => {
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
        if (!originalValuesSet) setOriginalMinReqFields(originalMinReqFieldsValue);

        // Initialize an object to track the edit status of each field
        initialEditStatus = {};

        // Iterate over each minimum requirement field and compare with the original value
        originalMinReqFieldsValue.forEach((item, index) => {
          // Determine if the field has been edited
          const isEdited = item.value !== originalMinReqFields[index]?.value;
          initialEditStatus[index] = isEdited;
        });

        // Set the editedMinReqFields state
        setEditedMinReqFields(initialEditStatus);

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

        if (!originalValuesSet) setOriginalValuesSet(true);

        reset({
          id: effectiveData?.id,
          number: effectiveData?.number,
          title: originalTitleValue,
          context: effectiveData?.context?.description,
          overview: originalOverviewValue,
          classifications: classificationIds,
          // array fileds are required to be nested in objects, so wrap string values in {value: item}
          required_accountabilities: originalAccReqFieldsValue,
          optional_accountabilities: originalOptReqFieldsValue,
          requirements: originalMinReqFieldsValue,
          behavioural_competencies: effectiveData?.behavioural_competencies || [],
        });
      }
      setRenderKey((prevKey) => prevKey + 1);
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
      originalOverview.value,
      originalTitle.value,
      originalAccReqFields,
      originalMinReqFields,
      originalOptReqFields,
    ]);

    // Required Accountability Fields

    const {
      fields: acc_req_fields,
      append: acc_req_append,
      remove: acc_req_remove,
      update: acc_req_update,
    } = useFieldArray({
      control,
      name: 'required_accountabilities',
    });

    // Optional Accountability Fields
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
      fields: requirement_fields,
      append: requirement_append,
      remove: requirement_remove,
      update: requirement_update,
    } = useFieldArray({
      control,
      name: 'requirements',
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
        return form.getFieldsValue();
      },
    }));

    // State to control visibility of the picker
    const [isPickerVisible, setPickerVisible] = useState(false);

    // ... other state and handlers for behavioural_competencies_fields ...

    const addBehaviouralCompetency = (competency: BehaviouralCompetencyData) => {
      behavioural_competencies_append(competency);
      setPickerVisible(false); // Hide picker after adding
    };

    // FOCUS ALERTS
    // when user focuses on required accountabilities and minimum requirements fields, show an alert once
    const { minReqAlertShown, setMinReqAlertShown } = useWizardContext();
    const { reqAlertShown, setReqAlertShown } = useWizardContext();

    // Function to handle focus
    const showMinReqModal = (action: () => void, showCancel: boolean) => {
      if (!minReqAlertShown) {
        setMinReqAlertShown(true);
        Modal.confirm({
          title: 'Attention',
          content: (
            <div role="alert">
              Significant changes to this area <strong>may</strong> trigger a classification review.
            </div>
          ),
          okText: 'Proceed',
          cancelText: 'Cancel',
          onOk: action,
          // The following props are set to style the modal like a warning
          icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
          okButtonProps: { style: {} },
          cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
          autoFocusButton: null,
        });
      } else {
        action();
      }
    };

    const showReqModal = (action: () => void, showCancel: boolean) => {
      if (!reqAlertShown) {
        setReqAlertShown(true);
        Modal.confirm({
          title: 'Attention',
          content: (
            <div role="alert">
              Removing required accountabilities <strong>may</strong> trigger a classification review
            </div>
          ),
          okText: 'Proceed',
          cancelText: 'Cancel',
          onOk: action,
          // The following props are set to style the modal like a warning
          icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
          okButtonProps: { style: {} },
          cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
          autoFocusButton: null,
        });
      } else {
        action();
      }
    };

    // DIFF HANDLING
    // Cross out deleted core items, allow ability to add back
    // Show fields that were edited

    // Required accountabilities
    const handleAccReqRemove = (index: number) => {
      const currentValues = getValues('required_accountabilities');
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
      const currentValues = getValues('required_accountabilities');
      acc_req_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleAccReqAddNew = () => {
      acc_req_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedAccReqFields, setEditedAccReqFields] = useState<{ [key: number]: boolean }>({});

    const renderAccReqFields = (field: any, index: number) => {
      const isEdited = editedAccReqFields[index] || field.isCustom;

      const handleFieldChange = (event: any) => {
        const updatedValue = event.target.value;
        setEditedAccReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalAccReqFields[index]?.value }));
        trigger();
      };

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
          <FormItem name={`required_accountabilities.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`required_accountabilities.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <FormItem
            name={`required_accountabilities.${index}.value`}
            control={control}
            style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
          >
            <TextArea
              autoSize
              disabled={field.disabled}
              className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
              onFocus={() => showReqModal(() => {}, false)}
              onChange={handleFieldChange}
            />
          </FormItem>
          {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#D9D9D9' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() =>
                showReqModal(() => {
                  // acc_req_remove(index);
                  handleAccReqAddBack(index);
                  setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                }, false)
              }
            />
          ) : (
            <Button
              icon={<DeleteOutlined style={{ color: '#D9D9D9' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() =>
                showReqModal(() => {
                  // acc_req_remove(index);
                  handleAccReqRemove(index);
                  setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                }, false)
              }
            />
          )}
        </List.Item>
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

      const handleFieldChange = (event: any) => {
        const updatedValue = event.target.value;
        setEditedOptReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalOptReqFields[index]?.value }));
      };

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
          <FormItem name={`optional_accountabilities.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`optional_accountabilities.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <FormItem
            name={`optional_accountabilities.${index}.value`}
            control={control}
            style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
          >
            <TextArea
              autoSize
              disabled={field.disabled}
              className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
              onChange={handleFieldChange}
            />
          </FormItem>
          {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#D9D9D9' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                // acc_req_remove(index);
                handleOptReqAddBack(index);
                setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          ) : (
            <Button
              icon={<DeleteOutlined style={{ color: '#D9D9D9' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() => {
                handleOptReqRemove(index);
                setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
              }}
            />
          )}
        </List.Item>
      );
    };

    // MINIMUM REQUIREMENTS DIFF
    const handleMinReqRemove = (index: number) => {
      const currentValues = getValues('requirements');
      if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
        // If it's a custom field, remove it from the form
        Modal.confirm({
          title: 'Are you sure you want to delete this item?',
          content: 'This action cannot be undone.',
          onOk: () => {
            // If confirmed, remove the item
            requirement_remove(index);
          },
        });
      } else {
        // If it's an original field, mark as disabled
        requirement_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
      }
      trigger();
    };

    // Function to add back a removed field
    const handleMinReqAddBack = (index: number) => {
      const currentValues = getValues('requirements');
      requirement_update(index, { ...currentValues[index], disabled: false });
    };

    // Function to handle adding a new field
    const handleMinReqAddNew = () => {
      requirement_append({ value: '', isCustom: true, disabled: false });
      trigger();
    };

    const [editedMinReqFields, setEditedMinReqFields] = useState<{ [key: number]: boolean }>({});

    const renderMinReqFields = (field: any, index: number) => {
      const isEdited = editedMinReqFields[index] || field.isCustom;

      const handleFieldChange = (event: any) => {
        const updatedValue = event.target.value;
        setEditedMinReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalMinReqFields[index]?.value }));
        trigger();
      };
      // console.log('field', JSON.stringify(field));
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
          <FormItem name={`requirements.${index}.disabled`} control={control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`requirements.${index}.isCustom`} control={control} hidden>
            <Input />
          </FormItem>

          <FormItem
            name={`requirements.${index}.value`}
            control={control}
            style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
          >
            <TextArea
              autoSize
              disabled={field.disabled}
              className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
              onFocus={() => showMinReqModal(() => {}, false)}
              onChange={handleFieldChange}
            />
          </FormItem>
          {field.disabled ? (
            <Button
              icon={<PlusOutlined style={{ color: '#D9D9D9' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() =>
                showMinReqModal(() => {
                  handleMinReqAddBack(index);
                  setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                }, false)
              }
            />
          ) : (
            <Button
              icon={<DeleteOutlined style={{ color: '#D9D9D9' }} />}
              style={{
                border: 'none', // Removes the border
                padding: 0, // Removes padding
              }}
              onClick={() =>
                showMinReqModal(() => {
                  handleMinReqRemove(index);
                  setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                }, false)
              }
            />
          )}
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
          <FormItem
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="title.value"
            control={control}
            colon={false}
            label={<span style={titleStyle}>Title</span>}
          >
            <Input className={`${isEdited ? 'edited-textarea' : ''}`} onChange={handleFieldChange} />
          </FormItem>
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
          <FormItem
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="overview.value"
            control={control}
            colon={false}
            label={<span style={titleStyle}>Overview</span>}
          >
            <TextArea autoSize className={`${isEdited ? 'edited-textarea' : ''}`} onChange={handleFieldChange} />
          </FormItem>
        </>
      );
    };

    if (isLoading || renderKey === 0) {
      return <p>Loading...</p>;
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
      marginBottom: '3rem',
      display: 'block',
    };

    return (
      <>
        <Form
          form={form}
          key={renderKey}
          onFinish={handleSubmit((data) => {
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
              role="note"
              style={{ marginBottom: '24px' }}
              message="Your organization must follow the following criteria in order for this role to be feasible"
              description={
                <>
                  <div></div>
                  <b style={{ marginTop: '10px', display: 'block' }}>{effectiveData?.context?.description}</b>
                </>
              }
              type="warning"
              showIcon
            />
          ) : (
            <></>
          )}
          {!config?.classificationEditable ? (
            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={titleStyle}>
                Classification - {effectiveData?.classifications?.map((c) => c.classification.code).join(', ')}
              </Title>
            </div>
          ) : (
            <></>
          )}

          <Row gutter={24}>
            <Col xl={16}>
              {renderTitle(getValues('title'))}

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

              <Title level={4} style={titleStyle}>
                Required Accountabilities
              </Title>

              <Alert
                role="note"
                style={{ marginBottom: '10px', marginTop: '1rem' }}
                message={
                  <>
                    Removing required accountabilities <strong>may</strong> trigger a classification review
                  </>
                }
                type="warning"
                showIcon
              />

              <>
                <List dataSource={acc_req_fields} renderItem={renderAccReqFields} />

                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={addStyle}
                  onClick={() =>
                    showReqModal(() => {
                      handleAccReqAddNew();
                      setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                    }, false)
                  }
                >
                  Add another accountability
                </Button>
              </>

              <Title level={4} style={titleStyle}>
                Optional Accountabilities
              </Title>
              <>
                <List dataSource={acc_opt_fields} renderItem={renderOptReqFields} />

                {/* <List
                  dataSource={acc_opt_fields}
                  renderItem={(_field, index) => (
                    <List.Item
                      style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0px', borderBottom: 'none' }}
                      key={_field.id}
                    >
                      <FormItem
                        name={`optional_accountabilities.${index}.value`}
                        style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
                        control={control}
                      >
                        <TextArea autoSize />
                      </FormItem>

                      <Button
                        type="text" // Changed to 'text' for an icon-only button
                        icon={<DeleteOutlined style={{ color: '#D9D9D9' }} />} // Using the DeleteOutlined icon
                        onClick={() => {
                          acc_opt_remove(index);
                          setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                        }}
                        style={{
                          border: 'none', // Removes the border
                          padding: 0, // Removes padding
                        }}
                      />
                    </List.Item>
                  )}
                /> */}

                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={addStyle}
                  onClick={() => {
                    handleOptReqAddNew();
                    setRenderKey((prevKey) => prevKey + 1);
                  }}
                >
                  Add optional accountability
                </Button>
              </>

              <Title level={4} style={titleStyle}>
                Minimum Job Requirements
              </Title>

              <Alert
                role="note"
                style={{ marginBottom: '10px', marginTop: '1rem' }}
                message={
                  <>
                    Significant changes to this area <strong>may</strong> trigger a classification review
                  </>
                }
                type="warning"
                showIcon
              />

              <>
                <List dataSource={requirement_fields} renderItem={renderMinReqFields} />
                {/* <List
                  dataSource={requirement_fields}
                  renderItem={(_field, index) => (
                    <List.Item
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '0px',
                        borderBottom: 'none',
                      }}
                      key={_field.id}
                    >
                      <FormItem
                        name={`requirements.${index}.value`}
                        style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
                        control={control}
                      >
                        <TextArea autoSize onFocus={() => showMinReqModal(() => {}, false)} />
                      </FormItem>

                      <Button
                        type="text" // Changed to 'text' for an icon-only button
                        icon={<DeleteOutlined style={{ color: '#D9D9D9' }} />} // Using the DeleteOutlined icon
                        onClick={() => {
                          showMinReqModal(() => {
                            requirement_remove(index);
                            setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                          }, false);
                        }}
                        style={{
                          border: 'none', // Removes the border
                          padding: 0, // Removes padding
                          // Adjust the following to align the icon properly with your design
                        }}
                      />
                    </List.Item>
                  )}
                /> */}

                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={addStyle}
                  onClick={() => {
                    showMinReqModal(() => {
                      handleMinReqAddNew();
                      setRenderKey((prevKey) => prevKey + 1);
                    }, false);
                  }}
                >
                  Add another requirement
                </Button>
              </>

              <Title level={4} style={titleStyle}>
                Behavioural competencies
              </Title>
              {/* Behavioural competencies */}

              <>
                <List
                  style={{ marginTop: '7px' }}
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
                        type="text" // No button styling, just the icon
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          behavioural_competencies_remove(index);
                          setRenderKey((prevKey) => prevKey + 1);
                        }}
                        style={{
                          border: 'none',
                          padding: 0,
                          color: '#D9D9D9',
                        }}
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
                <Alert
                  role="note"
                  style={{ marginBottom: '10px', marginTop: '1rem', fontStyle: 'italic' }}
                  message="* denotes an Indigenous Behavioural Competency"
                  type="info"
                  showIcon
                />

                {isPickerVisible ? (
                  <BehaviouralComptencyPicker
                    onAdd={addBehaviouralCompetency}
                    onCancel={() => setPickerVisible(false)}
                    filterIds={behavioural_competencies_fields.map((b) => b.behavioural_competency.id)}
                    style={{ marginTop: '20px' }}
                  />
                ) : (
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    style={{ ...addStyle, marginTop: '10px' }}
                    onClick={() => setPickerVisible(true)} // Show picker when "Add" button is clicked
                  >
                    Add a behavioural competency
                  </Button>
                )}
              </>
            </Col>
          </Row>
          {/* <WizardControls submitText={submitText} showBackButton={showBackButton} /> */}
        </Form>
      </>
    );
  },
);

export default WizardEditProfile;
