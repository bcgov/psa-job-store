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
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import '../../components/app/common/css/custom-form.css';
import { useGetDepartmentsWithLocationQuery } from '../../redux/services/graphql-api/department.api';
import { useGetLocationsQuery } from '../../redux/services/graphql-api/location.api';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { PositionProfileModel, useLazyGetPositionProfileQuery } from '../../redux/services/graphql-api/position.api';
import { findExcludedManager } from '../org-chart/utils/find-excluded-manager.util';
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchPositionProfile = useCallback(
    debounce(async (positionNumber: string) => {
      try {
        getPositionProfile({ positionNumber, suppressGlobalError: true });
        trigger('excludedManagerPositionNumber');
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

    if (
      !skipValidation &&
      ((noPositions && formValues.excludedManagerPositionNumber) ||
        (firstActivePosition && !firstActivePosition?.employeeName) ||
        isFetchingPositionProfileError)
    ) {
      // Set an error on the excludedManagerPositionNumber field
      setError('excludedManagerPositionNumber', {
        type: 'manual',
        message: noPositions
          ? 'Position not found'
          : !firstActivePosition?.employeeName
            ? 'Position is unencumbered'
            : 'Position not found',
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
    } catch (e) {
      console.error(e);
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
    trigger,
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

      const { orgchart_json, reports_to_position_id } = positionRequest ?? {
        orgchart_json: undefined,
        reports_to_position_id: undefined,
      };

      // Find first parent which is an excluded manager
      const lookup =
        orgchart_json != null && reports_to_position_id != null
          ? findExcludedManager(`${reports_to_position_id}`, orgchart_json)
          : undefined;

      setValue('excludedManagerPositionNumber', additional_info_excluded_mgr_position_number || lookup?.id || '');
      if (lookup?.id) {
        debouncedFetchPositionProfile(lookup.id);
      }

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

  // console.log('firstActivePosition:', firstActivePosition);
  // console.log('errors.excludedManagerPosit: ', errors.excludedManagerPositionNumber);

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
            disabled={isFetchingPositionProfile}
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
          <Row justify="center" gutter={16} role="form" aria-label="additional information">
            <Col sm={24} md={24} lg={24} xxl={18}>
              <Row justify="center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form
                    layout="vertical"
                    onFinish={handleSubmit(() => {
                      // console.log(data);
                    })}
                  >
                    <Card
                      title={<h3 style={{ fontWeight: '600', fontSize: '16px' }}>Confirmation</h3>}
                      bordered={false}
                      className="custom-card"
                    >
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Form.Item
                            name="confirmation"
                            validateStatus={errors.confirmation ? 'error' : ''}
                            help={errors.confirmation?.message}
                          >
                            <Controller
                              name="confirmation"
                              control={control}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <Switch
                                    aria-labelledby="confirmation-label-id"
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
                            <span style={{ marginLeft: '1rem' }} id="confirmation-label-id">
                              I confirm that I have received executive approval (Deputy Minister or delegate) for this
                              new position.
                            </span>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                    <Card
                      title={
                        <span id="department-id-label">
                          <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Department ID</h3>
                        </span>
                      }
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
                                  aria-labelledby="department-id-label"
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
                      title={
                        <span id="excluded-manager-id-label">
                          <h3 style={{ fontWeight: '600', fontSize: '16px' }}>First level excluded manager</h3>
                        </span>
                      }
                      bordered={false}
                      className="custom-card"
                      style={{ marginTop: 16 }}
                    >
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={12}>
                          <Form.Item
                            style={{ margin: 0 }}
                            name="firstLevelExcludedManager"
                            validateStatus={
                              (errors.excludedManagerPositionNumber && !isFetchingPositionProfile) ||
                              (noPositions && !isFetchingPositionProfile) ||
                              (firstActivePosition &&
                                !firstActivePosition?.employeeName &&
                                !isFetchingPositionProfile) ||
                              isFetchingPositionProfileError
                                ? 'error'
                                : ''
                            }
                            help={
                              (errors.excludedManagerPositionNumber && !isFetchingPositionProfile) || // error is present and not fetching OR
                              (noPositions && !isFetchingPositionProfile) || // no positions and not fetching
                              (firstActivePosition &&
                                !firstActivePosition?.employeeName &&
                                !isFetchingPositionProfile) ||
                              isFetchingPositionProfileError // fetch error
                                ? errors.excludedManagerPositionNumber
                                  ? errors.excludedManagerPositionNumber?.message
                                  : firstActivePosition && !firstActivePosition.employeeName
                                    ? 'Position is unencumbered'
                                    : 'Position not found'
                                : ''
                            }
                          >
                            <Controller
                              name="excludedManagerPositionNumber"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                  aria-labelledby="excluded-manager-id-label"
                                  data-testid="reporting-manager-input"
                                  onBlur={onBlur}
                                  value={value}
                                  onChange={(e) => {
                                    debouncedFetchPositionProfile(e.target.value); // Fetch position profile
                                    onChange(e); // Update controller state
                                  }}
                                  placeholder="Position number"
                                  disabled={!confirmation}
                                />
                              )}
                            />

                            {/* <div>
                              errors.excludedManagerPositionNumber:{' '}
                              {errors.excludedManagerPositionNumber &&
                                JSON.stringify(errors.excludedManagerPositionNumber)}
                            </div>
                            <div>noPositions: {noPositions.toString()}</div>
                            <div>isFetchingPositionProfileError: {isFetchingPositionProfileError.toString()}</div> */}
                          </Form.Item>
                          <div>
                            {firstActivePosition &&
                              !isFetchingPositionProfile &&
                              firstActivePosition.employeeName &&
                              !noPositions &&
                              !errors.excludedManagerPositionNumber &&
                              !isFetchingPositionProfileError && (
                                <div style={{ height: '15px' }}>
                                  <p>
                                    {`${firstActivePosition.employeeName} - ${firstActivePosition.ministry}`}
                                    {additionalPositions > 0 && ` +${additionalPositions}`}
                                  </p>
                                </div>
                              )}
                            {isFetchingPositionProfile && (
                              <LoadingSpinnerWithMessage data-testid="loading-spinner" mode="small" />
                            )}
                          </div>
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
                    <span>
                      <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Other Details</h3>
                    </span>
                    <Tooltip
                      trigger={['hover', 'click']}
                      title="Information shown here is dependent on the values that you selected in the previous steps."
                    >
                      <Button
                        id="changes"
                        role="note"
                        type="link"
                        aria-label="Why can't I make changes? Because information shown here is dependent on the values that you selected in the previous steps."
                      >
                        Why can't I make changes?
                      </Button>
                    </Tooltip>
                  </div>
                }
                bordered={false}
              >
                <Form layout="vertical" data-testid="job-info">
                  <Form.Item
                    name="jobTitle"
                    label={<h4 style={{ margin: 0 }}>Job title</h4>}
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div style={{ margin: 0 }}>
                      {typeof wizardData?.title === 'string' ? wizardData?.title : wizardData?.title?.value}
                    </div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="expectedClass"
                    label={<h4 style={{ margin: 0 }}>Expected classification level</h4>}
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div style={{ margin: 0 }}>{wizardData?.classifications?.[0]?.classification?.name ?? ''}</div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="jobTitle"
                    label={<h4 style={{ margin: 0 }}>Reporting Manager</h4>}
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div data-testid="reporting-manager-info">
                      <PositionProfile
                        positionNumber={positionRequestData?.reports_to_position_id}
                        orgChartData={positionRequestData?.orgchart_json}
                      ></PositionProfile>
                    </div>
                    {/* <div style={{ margin: 0 }}>
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
                      {isFetchingPositionProfile2 && <LoadingSpinnerWithMessage mode={'small'} />}
                      {isFetchingPositionProfileError2 && <p>Error loading, please refresh page</p>}
                    </div> */}
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="jobTitle"
                    label={<h4 style={{ margin: 0 }}>Type</h4>}
                    labelCol={{ className: 'card-label' }}
                    colon={false}
                  >
                    <div style={{ margin: 0 }}>Full-time, regular</div>
                  </Form.Item>

                  <Divider className="hr-reduced-margin" />

                  <Form.Item
                    name="jobTitle"
                    label={<h4 style={{ margin: 0 }}>Job Store profile number</h4>}
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
