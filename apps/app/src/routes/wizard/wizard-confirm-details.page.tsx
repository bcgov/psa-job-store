/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Select,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { IsNotEmpty, ValidationOptions, registerDecorator } from 'class-validator';
import debounce from 'lodash.debounce';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import '../../components/app/common/css/custom-form.css';
import { useGetDepartmentsWithLocationQuery } from '../../redux/services/graphql-api/department.api';
import { useGetLocationsQuery } from '../../redux/services/graphql-api/location.api';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { PositionProfileModel, useLazyGetPositionProfileQuery } from '../../redux/services/graphql-api/position.api';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';
import './wizard-confirm-details.page.css';

interface WizardConfirmPageProps {
  onNext?: () => void;
  onBack?: () => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
}

function IsTrue(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTrue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: boolean) {
          return value === true;
        },
      },
    });
  };
}

// @ValidatorConstraint({ async: true })
// class PositionValidator implements ValidatorConstraintInterface {
//   validate(value: any, args: ValidationArguments) {
//     const object = args.object as WizardConfirmDetailsModel;

//     // Check if no positions are found or if the input value is empty
//     if (object.noPositions || !value) {
//       return false;
//     }
//     return true;
//   }
// }

export class WizardConfirmDetailsModel {
  @IsTrue({ message: 'You must confirm that you have received executive approval (Deputy Minister or delegate)' })
  confirmation: boolean;

  @IsNotEmpty({ message: 'Work location is required' })
  workLocation: string | null;

  @IsNotEmpty({ message: 'Department ID is required' })
  payListDepartmentId: string | null;

  // Validate only if the field is not empty
  // @ValidateIf((o) => o.excludedManagerPositionNumber !== '')
  // @Validate(PositionValidator, {
  //   message: 'Invalid position number',
  // })
  // @ValidateIf((o) => o.excludedManagerPositionNumber !== '')
  // @Validate(PositionValidator, {
  //   message: 'Invalid position number',
  // })
  @IsNotEmpty({ message: 'First level excluded manager position number is required' })
  excludedManagerPositionNumber: string;

  comments: string; // Optional, no validation rules needed

  noPositions: boolean;
}

// export const WizardReviewPage = () => {
export const WizardConfirmDetailsPage: React.FC<WizardConfirmPageProps> = ({
  onNext,
  onBack,
  disableBlockingAndNavigateHome,
  positionRequest,
}) => {
  // const [createJobProfile] = useCreateJobProfileMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [updatePositionRequest] = useUpdatePositionRequestMutation();

  // this is for the first level excluded manager
  const [
    getPositionProfile,
    { data: positionProfileData, isFetching: isFetchingPositionProfile, isError: isFetchingPositionProfileError },
  ] = useLazyGetPositionProfileQuery();

  // this is for the reporting manager
  const [
    getPositionProfile2,
    { data: positionProfileData2, isFetching: isFetchingPositionProfile2, isError: isFetchingPositionProfileError2 },
  ] = useLazyGetPositionProfileQuery();

  const departmentsData = useGetDepartmentsWithLocationQuery().data?.departments;

  // State to track selected location
  // const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // State to track selected department
  // const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // useEffect(() => {
  //   setSelectedDepartment(null); // Clear selected department
  // }, [selectedLocation, positionProfileData]);

  // Filter departments based on selected location

  // const filteredDepartments = departmentsData?.filter((department) => department.location_id === selectedLocation);

  const [additionalPositions, setAdditionalPositions] = useState(0);
  const [noPositions, setNoPositions] = useState(false);
  const [firstActivePosition, setFirstActivePosition] = useState<PositionProfileModel>();
  const [firstActivePosition2, setFirstActivePosition2] = useState<PositionProfileModel>();
  const [additionalPositions2, setAdditionalPositions2] = useState(0);

  useEffect(() => {
    if (positionProfileData && positionProfileData.positionProfile) {
      setNoPositions(false);
      if (positionProfileData.positionProfile.length === 0) {
        setNoPositions(true);
      }

      const activePositions = positionProfileData.positionProfile.filter((p) => p.status === 'Active');
      setFirstActivePosition(activePositions[0] || null);

      // Set state to the number of additional active positions
      setAdditionalPositions(positionProfileData.positionProfile.length - 1);
    }
  }, [positionProfileData]);

  useEffect(() => {
    if (positionProfileData2 && positionProfileData2.positionProfile) {
      const activePositions = positionProfileData2.positionProfile.filter((p) => p.status === 'Active');
      setFirstActivePosition2(activePositions[0] || null);

      // Set state to the number of additional active positions
      setAdditionalPositions2(positionProfileData2.positionProfile.length - 1);
    }
  }, [positionProfileData2]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchPositionProfile = useCallback(
    debounce(async (positionNumber: string) => {
      try {
        console.log(positionNumber);
        getPositionProfile({ positionNumber, suppressGlobalError: true });
      } catch (e) {
        // handled by isError, prevents showing error toast
        console.log(e);
      }
    }, 300),
    [getPositionProfile],
  );

  const { positionRequestId, wizardData, positionRequestData } = useWizardContext();

  // get position request data

  // const {
  //   data: positionRequestData,
  //   isLoading: positionRequestLoading,
  //   isError: positionRequestLoadingError,
  // } = useGetPositionRequestQuery({
  //   id: positionRequestId ?? -1,
  // });

  // console.log('positionRequestData: ', positionRequestData);

  // get profile info for reporting position from reports_to_position_id using GetPositionProfileQuery and useEffect
  useEffect(() => {
    if (positionRequestData?.reports_to_position_id) {
      getPositionProfile2({
        positionNumber: positionRequestData.reports_to_position_id.toString(),
        uniqueKey: 'managerProfile',
      });
    }
  }, [positionRequestData?.reports_to_position_id, getPositionProfile2]);

  // get profile info for excluded manager from additional_info_excluded_mgr_position_number using GetPositionProfileQuery and useEffect
  useEffect(() => {
    async function fetchExcludedManagerProfile() {
      if (positionRequestData?.additional_info_excluded_mgr_position_number) {
        try {
          await getPositionProfile({
            positionNumber: positionRequestData.additional_info_excluded_mgr_position_number,
            uniqueKey: 'excludedManagerProfile',
            suppressGlobalError: true,
          }).unwrap();
        } catch (e) {
          setNoPositions(true);
        }
      }
    }
    fetchExcludedManagerProfile();
  }, [positionRequestData?.additional_info_excluded_mgr_position_number, getPositionProfile]);

  const { data: allLocations } = useGetLocationsQuery();

  const showModal = async ({ skipValidation = false, updateStep = true } = {}) => {
    // console.log('showModal', skipValidation, updateStep);

    if (isFetchingPositionProfile) return; // Do not show the modal while fetching position profile

    // Clear any existing errors on the excludedManagerPositionNumber field
    if (!skipValidation) clearErrors('excludedManagerPositionNumber');

    // Check if noPositions is true and excludedManagerPositionNumber should be filled
    const formValues = getValues();
    // console.log('got values');
    // console.log(
    //   '!skipValidation && noPositions && formValues.excludedManagerPositionNumber: ',
    //   !skipValidation,
    //   noPositions,
    //   formValues.excludedManagerPositionNumber,
    // );
    if (!skipValidation && noPositions && formValues.excludedManagerPositionNumber) {
      // Set an error on the excludedManagerPositionNumber field
      setError('excludedManagerPositionNumber', {
        type: 'manual',
        message: 'Position not found',
      });
      // console.log('error, returning');
      Modal.error({
        title: 'Error',
        content: (
          <div>
            <p>The form contains errors, please fix them before proceeding.</p>
          </div>
        ),
        onOk() {},
      });
      return; // Do not open the modal
    }

    // console.log('handlesubmit');
    if (skipValidation) {
      // console.log('handleOk 2');
      await handleOk(updateStep);
      return false;
    }

    handleSubmit(
      () => {
        // If the form is valid, show the modal
        // setIsModalVisible(true);
        // console.log('handleOk 1');
        handleOk(updateStep);
      },
      () => {
        Modal.error({
          title: 'Error',
          content: (
            <div>
              <p>The form contains errors, please fix them before proceeding.</p>
            </div>
          ),
          onOk() {},
        });
        // console.log('form errors: ', errors);
        // Handle form validation errors
        // You might want to log or display these errors
      },
    )(); // Immediately invoke the returned function from handleSubmit
    return false; // Prevents default behavior until validation is passed
  };

  const handleOk = async (updateStep = true) => {
    // console.log('handleOK');

    // User pressed next on the review screen
    // A modal appeared with terms
    // User confirmed the terms in the modal by pressing OK

    setIsLoading(true);

    try {
      const formData = getValues();
      // console.log('formData: ', formData);
      if (positionRequestId) {
        // console.log('updatePositionRequest');
        await updatePositionRequest({
          id: positionRequestId,
          step: updateStep ? 5 : 4,
          // status: 'COMPLETED',
          // position_number: 123456,

          // attach additional information
          workLocation: { connect: { id: formData.workLocation || '' } },
          paylist_department: { connect: { id: formData.payListDepartmentId || '' } },
          additional_info_excluded_mgr_position_number: formData.excludedManagerPositionNumber,
          additional_info_comments: formData.comments,
        }).unwrap();
        if (onNext && updateStep) onNext();
      } else {
        throw Error('Position request not found');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const { wizardData } = useWizardContext();
  const onBackCallback = async () => {
    if (positionRequestId) {
      await updatePositionRequest({
        id: positionRequestId,
        step: 3,
      }).unwrap();
      if (onBack) onBack();
    } else {
      throw Error('Position request not found');
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<WizardConfirmDetailsModel>({
    resolver: classValidatorResolver(WizardConfirmDetailsModel),
    defaultValues: {
      confirmation: false,
      workLocation: null as string | null,
      excludedManagerPositionNumber: '',
      payListDepartmentId: null as string | null,
      comments: '',
    },
  });

  useEffect(() => {
    if (positionRequestData) {
      const {
        additional_info_work_location_id,
        additional_info_department_id,
        additional_info_excluded_mgr_position_number,
        additional_info_comments,
      } = positionRequestData;
      setValue(
        'workLocation',
        additional_info_work_location_id ||
          departmentsData?.find((dept) => dept.id === positionRequestData?.department_id)?.location_id ||
          null,
      );
      setValue('payListDepartmentId', additional_info_department_id || positionRequestData?.department_id || null);
      setValue('excludedManagerPositionNumber', additional_info_excluded_mgr_position_number || '');
      setValue('comments', additional_info_comments || '');

      if (
        additional_info_work_location_id ||
        additional_info_department_id ||
        additional_info_excluded_mgr_position_number ||
        additional_info_comments
      ) {
        setValue('confirmation', true);
      }
    }
  }, [departmentsData, positionRequestData, setValue]);

  const confirmation = watch('confirmation');

  const srOnlyStyle: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: '0',
  };

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
    await showModal({ skipValidation: true, updateStep: false });
    disableBlockingAndNavigateHome();
  };

  const getMenuContent = () => {
    return (
      <Menu>
        <Menu.Item key="save" onClick={saveAndQuit} data-testid="save-and-quit">
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

  if (!allLocations) return <LoadingSpinnerWithMessage />;

  return (
    <div data-testid="additional-information-form">
      <WizardPageWrapper
        title={
          <div>
            <Link to="/" aria-label="Go to dashboard">
              <ArrowLeftOutlined aria-hidden style={{ color: 'black', marginRight: '1rem' }} />
            </Link>
            {positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position'}
          </div>
        }
        subTitle={<div>We need a few more pieces of information to action your request for a new position.</div>}
        additionalBreadcrumb={{
          title:
            positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
        }}
        hpad={false}
        grayBg={false}
        pageHeaderExtra={[
          <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
            <Button data-testid="ellipsis-menu" icon={<EllipsisOutlined />}></Button>
          </Popover>,
          <Button onClick={onBackCallback} key="back" data-testid="back-button">
            Back
          </Button>,
          <Button
            key="next"
            type="primary"
            onClick={() => showModal()}
            data-testid="next-button"
            loading={isLoading}
            disabled={isFetchingPositionProfile || isFetchingPositionProfile2}
          >
            Save and next
          </Button>,
        ]}
      >
        <WizardSteps current={4}></WizardSteps>

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
            <Col sm={24} md={24} lg={24} xxl={18}>
              <Row justify="center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form
                    layout="vertical"
                    onFinish={handleSubmit(() => {
                      // console.log(data);
                    })}
                  >
                    <Card title="Confirmation" bordered={false} className="custom-card">
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Form.Item
                            name="confirmation"
                            validateStatus={errors.confirmation ? 'error' : ''}
                            help={errors.confirmation?.message}
                          >
                            <label style={srOnlyStyle} htmlFor="confirmation">
                              Confirmation
                            </label>
                            <Controller
                              name="confirmation"
                              control={control}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <Switch
                                    checkedChildren="Yes"
                                    data-testid="confirmation-switch"
                                    checked={value}
                                    onChange={(newValue) => {
                                      onChange(newValue);
                                    }}
                                  />
                                );
                              }}
                            />
                            <span style={{ marginLeft: '1rem' }}>
                              I confirm that I have received executive approval (Deputy Minister or delegate) for this
                              new position.
                            </span>
                            {/* {errors.confirmation && <p style={{ color: 'red' }}>{errors.confirmation.message}</p>} */}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                    <Card
                      title="Department ID"
                      // title="Department & work location"
                      bordered={false}
                      className="custom-card"
                      style={{ marginTop: 16 }}
                    >
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={12}>
                          <Form.Item
                            name="payListDepartmentId"
                            // label="Department ID"
                            // labelCol={{ className: 'card-label' }}
                            validateStatus={errors.payListDepartmentId ? 'error' : ''}
                            help={errors.payListDepartmentId?.message}
                          >
                            <Controller
                              name="payListDepartmentId"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                  data-testid="department-select"
                                  onChange={(newValue) => {
                                    const selectedDept = departmentsData?.find((dept) => dept.id === newValue);
                                    // setSelectedDepartment(selectedDept?.name || ''); // Update selected department name
                                    setValue('workLocation', selectedDept?.location_id || null);
                                    // setSelectedLocation(newValue);
                                    onChange(newValue); // Update the form state
                                  }}
                                  showSearch
                                  onBlur={onBlur}
                                  value={value}
                                  filterOption={(input, option) => {
                                    if (!option) return false;
                                    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                  }}
                                  options={departmentsData?.map((group) => ({
                                    label: `${group.name + ' ' + group.id}`,
                                    value: group.id,
                                  }))}
                                  placeholder="Select department"
                                  disabled={!confirmation}
                                  notFoundContent={
                                    <Empty
                                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      description={
                                        <span style={{ color: 'black' }}>
                                          No departments - please select a location with departments
                                        </span>
                                      }
                                    />
                                  }
                                ></Select>
                              )}
                            />
                            {/* {errors.payListDepartmentId && <p style={{ color: 'red' }}>{errors.payListDepartmentId.message}</p>} */}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                    <Card
                      title="First level excluded manager"
                      bordered={false}
                      className="custom-card"
                      style={{ marginTop: 16 }}
                    >
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={12}>
                          <Form.Item
                            name="firstLevelExcludedManager"
                            validateStatus={
                              (errors.excludedManagerPositionNumber && !isFetchingPositionProfile) ||
                              (noPositions && !isFetchingPositionProfile) ||
                              isFetchingPositionProfileError
                                ? 'error'
                                : ''
                            }
                            // display help only if there is an error and the position profile is not being fetched

                            help={
                              (errors.excludedManagerPositionNumber && !isFetchingPositionProfile) ||
                              (noPositions && !isFetchingPositionProfile) ||
                              isFetchingPositionProfileError
                                ? errors.excludedManagerPositionNumber
                                  ? errors.excludedManagerPositionNumber?.message
                                  : 'Position not found'
                                : ''
                            }
                          >
                            <label style={srOnlyStyle} htmlFor="excludedManagerPositionNumber">
                              First level excluded manager
                            </label>
                            <Controller
                              name="excludedManagerPositionNumber"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                  data-testid="reporting-manager-input"
                                  onBlur={onBlur}
                                  value={value}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      debouncedFetchPositionProfile(e.target.value); // Fetch position profile
                                    }
                                    onChange(e); // Update controller state
                                  }}
                                  placeholder="Position number"
                                  disabled={!confirmation}
                                />
                              )}
                            />
                            {firstActivePosition && !isFetchingPositionProfile && (
                              <div>
                                <p>
                                  {`${firstActivePosition.employeeName} - ${firstActivePosition.ministry}`}
                                  {additionalPositions > 0 && ` +${additionalPositions}`}
                                </p>
                              </div>
                            )}
                            {/* {noPositions && !isFetchingPositionProfile && <p>Position not found</p>} */}
                            {isFetchingPositionProfile && (
                              <LoadingSpinnerWithMessage data-testid="loading-spinner" mode="small" />
                            )}
                            {/* {errors.excludedManagerPositionNumber && !isFetchingPositionProfile && (
                      <p style={{ color: 'red' }}>{errors.excludedManagerPositionNumber.message}</p>
                    )} */}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                    {/* <Card title="Comments" bordered={false} className="custom-card" style={{ marginTop: 16 }}>
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={12}>
                          <Form.Item name="comments">
                            <label style={srOnlyStyle} htmlFor="comments">
                              Comments
                            </label>
                            <Controller
                              name="comments"
                              control={control}
                              render={({ field }) => {
                                return (
                                  <>
                                    <Input.TextArea
                                      data-testid="comments-input"
                                      {...field}
                                      autoSize
                                      disabled={!confirmation}
                                      maxLength={1000}
                                    />
                                    <Typography.Paragraph
                                      type="secondary"
                                      style={{ textAlign: 'right', width: '100%', margin: '0' }}
                                    >
                                      {(field.value as string).length} / 1000
                                    </Typography.Paragraph>
                                  </>
                                );
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card> */}
                  </Form>
                </Col>
              </Row>

              {/* Other details card */}
              <Card
                style={{ marginTop: '1rem' }}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Other Details</span>
                    <Tooltip title="Information shown here is dependent on the values that you selected in the previous steps.">
                      <Button id="changes" type="link">
                        Why can't I make changes?
                      </Button>
                    </Tooltip>
                  </div>
                }
                bordered={false}
              >
                <Form layout="vertical" data-testid="job-info">
                  <Form.Item name="jobTitle" label="Job title" labelCol={{ className: 'card-label' }} colon={false}>
                    <div style={{ margin: 0 }}>
                      {typeof wizardData?.title === 'string' ? wizardData?.title : wizardData?.title?.value}
                    </div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="expectedClass"
                    label="Expected classification level"
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div style={{ margin: 0 }}>{wizardData?.classifications?.[0]?.classification?.name ?? ''}</div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="jobTitle"
                    label="Reporting Manager"
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div style={{ margin: 0 }}>
                      {firstActivePosition2 && !isFetchingPositionProfile2 && !isFetchingPositionProfileError2 && (
                        <div data-testid="reporting-manager-info">
                          <p
                            style={{ margin: 0 }}
                          >{`${firstActivePosition2.employeeName}, ${firstActivePosition2.ministry}`}</p>
                          <Typography.Paragraph type="secondary">
                            {`${firstActivePosition2.positionDescription}, ${firstActivePosition2.classification}`}
                            <br></br>
                            {`Position No.: ${firstActivePosition2.positionNumber}`}
                            {additionalPositions2 > 0 && ` +${additionalPositions2}`}
                          </Typography.Paragraph>
                        </div>
                      )}
                      {/* {noPositions && !isFetchingPositionProfile && <p>Position not found</p>} */}
                      {isFetchingPositionProfile2 && <LoadingSpinnerWithMessage mode={'small'} />}
                      {isFetchingPositionProfileError2 && <p>Error loading, please refresh page</p>}
                    </div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item name="jobTitle" label="Type" labelCol={{ className: 'card-label' }} colon={false}>
                    <div style={{ margin: 0 }}>Full-time, regular</div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="jobTitle"
                    label="Job Store profile number"
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div style={{ margin: 0 }}>{wizardData?.number}</div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </WizardPageWrapper>
    </div>
  );
};
