import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Alert, Button, Col, Form, Input, List, Modal, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import {
  ClassificationModel,
  GetClassificationsResponse,
  useLazyGetClassificationsQuery,
} from '../../../redux/services/graphql-api/classification.api';
import { JobProfileModel, useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import BehaviouralComptencyPicker, { BehaviouralCompetencyData } from './wizard-behavioural-comptency-picker';

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
        console.log('edit triggerGetJobProfile with id: ', id);
        triggerGetJobProfile({ id: +id });
      }
      triggerGetClassificationData(); // get data to populate classification dropdown. Todo: cache this?
    }, [id, profileData, triggerGetJobProfile, triggerGetClassificationData]);

    useEffect(() => {
      if (classificationsData && !classificationsDataIsLoading && receivedClassificationsDataCallback) {
        receivedClassificationsDataCallback(classificationsData);
      }
    }, [classificationsData, classificationsDataIsLoading, receivedClassificationsDataCallback]);

    const { register, control, reset, handleSubmit } = useForm<JobProfileValidationModel>({
      resolver: classValidatorResolver(JobProfileValidationModel),
      mode: 'onChange',
    });

    // useEffect to set effectiveData when data is fetched from the API
    useEffect(() => {
      if (!profileData && data && !isLoading) {
        // Only set effectiveData from fetched data if profileData is not provided
        setEffectiveData(data.jobProfile);
      }
    }, [data, isLoading, profileData]);

    const [form] = Form.useForm();

    // todo: usage of this approach is undesirable, however it fixes various render issues
    // that appear to be linked with the custom FormItem component. Ideally eliminate the usage
    // of this state
    const [renderKey, setRenderKey] = useState(0);
    useEffect(() => {
      form.resetFields(); // "form" is needed to use with ref and to get the state. Must do "resetFields"
      // as part of the render hack. todo: get rid of this if possible
    }, [renderKey, form]);

    useEffect(() => {
      if (effectiveData && !isLoading && classificationsData) {
        const classificationId = effectiveData?.classification
          ? classificationsData.classifications.find(
              (c) =>
                c.occupation_group.id === effectiveData.classification?.occupation_group.id &&
                c.grid.id === effectiveData.classification.grid.id,
            )?.id
          : null;

        console.log('effectiveData: ', effectiveData);
        reset({
          id: effectiveData?.id,
          number: effectiveData?.number,
          title: effectiveData?.title,
          context: effectiveData?.context,
          overview: effectiveData?.overview,
          classification: classificationId,
          // array fileds are required to be nested in objects, so wrap string values in {value: item}
          required_accountabilities: effectiveData?.accountabilities.required
            ? effectiveData.accountabilities.required.map((item) => ({ value: item }))
            : [],
          optional_accountabilities: effectiveData?.accountabilities.optional
            ? effectiveData.accountabilities.optional.map((item) => ({ value: item }))
            : [],
          requirements: effectiveData?.requirements ? effectiveData.requirements.map((item) => ({ value: item })) : [],
          behavioural_competencies: effectiveData?.behavioural_competencies || [],
        });
      }
      setRenderKey((prevKey) => prevKey + 1);
    }, [effectiveData, isLoading, classificationsData, reset]);

    // Required Accountability Fields

    const {
      fields: acc_req_fields,
      append: acc_req_append,
      remove: acc_req_remove,
    } = useFieldArray({
      control,
      name: 'required_accountabilities',
    });

    // Optional Accountability Fields
    const {
      fields: acc_opt_fields,
      append: acc_opt_append,
      remove: acc_opt_remove,
    } = useFieldArray({
      control,
      name: 'optional_accountabilities',
    });

    const {
      fields: requirement_fields,
      append: requirement_append,
      remove: requirement_remove,
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

    console.log('behavioural_competencies_fields: ', behavioural_competencies_fields);

    // useImperativeHandle to expose the submitForm function
    useImperativeHandle(ref, () => ({
      // You can expose any method you need from the form instance here
      submit: () => {
        console.log('userImperative submit?');
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
      console.log('addBehaviouralCompetency, competency: ', competency);
      behavioural_competencies_append(competency);
      setPickerVisible(false); // Hide picker after adding
    };

    // FOCUS ALERTS
    // when user focuses on required accountabilities and minimum requirements fields, show an alert once
    const [minReqalertShown, setMinReqAlertShown] = useState(false);
    const [reqalertShown, setReqAlertShown] = useState(false);

    // Function to handle focus
    const showMinReqModal = (action, showCancel) => {
      if (!minReqalertShown) {
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

    const showReqModal = (action, showCancel) => {
      if (!reqalertShown) {
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
            console.log('wizard-edit-profile form onFinish, data: ', data);
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

          <FormItem name="classification" control={control} hidden>
            <Input />
          </FormItem>

          {/* // <JobProfileEditableField
        //   fieldId="title"
        //   control={control}
        //   renderViewMode={(formValue) => <>{formValue}</>}
        //   renderEditMode={() => (
        //     <FormItem name="title" control={control}>
        //       <Input />
        //     </FormItem>
        //   )}
        // />
         */}

          {!config?.contextEditable ? (
            <Alert
              role="note"
              style={{ marginBottom: '24px' }}
              message="Your organization must follow the following criteria in order for this role to be feasible"
              description={
                <>
                  <div></div>
                  <b style={{ marginTop: '10px', display: 'block' }}>{effectiveData?.context}</b>
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
                Classification -{' '}
                {`${effectiveData?.classification?.occupation_group.name} ${effectiveData?.classification?.grid.name}`}
              </Title>
            </div>
          ) : (
            <></>
          )}

          <Row gutter={24}>
            <Col xl={16}>
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="title"
                control={control}
                colon={false}
                label={<span style={titleStyle}>Title</span>}
              >
                <Input />
              </FormItem>

              {config?.classificationEditable ? (
                <FormItem name="classification" control={control} label="Classification">
                  <Select {...register('classification')}>
                    {classificationsData?.classifications.map((classification: ClassificationModel) => (
                      <Select.Option value={classification.id} key={classification.id}>
                        {`${classification.occupation_group.name} ${classification.grid.name}`}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              ) : (
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
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="overview"
                control={control}
                colon={false}
                label={<span style={titleStyle}>Overview</span>}
              >
                <TextArea autoSize />
              </FormItem>

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
                <List
                  dataSource={acc_req_fields}
                  renderItem={(_field, index) => (
                    <List.Item
                      style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0px', borderBottom: 'none' }}
                      key={_field.id}
                    >
                      <FormItem
                        name={`required_accountabilities.${index}.value`}
                        control={control}
                        style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
                      >
                        <TextArea
                          {...register(`required_accountabilities.${index}.value`)}
                          autoSize
                          onFocus={() => showReqModal(() => {}, false)}
                        />
                      </FormItem>
                      {/* <input
                      // key={field.id} // important to include key with field's id
                      {...register(`required_accountabilities.${index}.value`)}
                    /> */}

                      <Button
                        type="text" // Changed to 'text' for an icon-only button
                        icon={<DeleteOutlined style={{ color: '#D9D9D9' }} />} // Using the DeleteOutlined icon
                        onClick={() =>
                          showReqModal(() => {
                            acc_req_remove(index);
                            setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
                          }, false)
                        }
                        style={{
                          border: 'none', // Removes the border
                          padding: 0, // Removes padding
                        }}
                      />
                    </List.Item>
                  )}
                />

                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={addStyle}
                  onClick={() =>
                    showReqModal(() => {
                      acc_req_append({ value: '' });
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
                <List
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
                />

                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={addStyle}
                  onClick={() => {
                    acc_opt_append({ value: '' });
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
                <List
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
                />

                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={addStyle}
                  onClick={() => {
                    showMinReqModal(() => {
                      requirement_append({ value: '' });
                      setRenderKey((prevKey) => prevKey + 1); // Fixes issue where deleting item doesn't render properly
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
                        <strong>{field.behavioural_competency.name}</strong>: {field.behavioural_competency.description}
                      </p>

                      {/* Trash icon/button for deletion */}
                      <Button
                        type="text" // No button styling, just the icon
                        icon={<DeleteOutlined />}
                        onClick={() => behavioural_competencies_remove(index)}
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

                {isPickerVisible ? (
                  <BehaviouralComptencyPicker
                    onAdd={addBehaviouralCompetency}
                    onCancel={() => setPickerVisible(false)}
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
