/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Card, Col, Empty, Form, Input, Menu, Modal, Row, Select, Typography } from 'antd';
import { IsNotEmpty } from 'class-validator';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AcessiblePopoverMenu from '../../components/app/common/components/accessible-popover-menu';
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
import { findExcludedManager } from '../org-chart/utils/find-excluded-manager.util';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';
import './wizard-confirm-details.page.css';

interface WizardConfirmPageProps {
  onNext?: () => void;
  onBack?: () => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
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
  @IsNotEmpty({ message: 'Work location is required' })
  workLocation: string | null;

  @IsNotEmpty({ message: 'Department ID is required' })
  payListDepartmentId: string | null;

  @IsNotEmpty({ message: 'Branch is required' })
  branch: string;

  @IsNotEmpty({ message: 'Division is required' })
  division: string;

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
  setCurrentStep,
}) => {
  // const [createJobProfile] = useCreateJobProfileMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const [isFormModified, setIsFormModified] = useState(false);
  const { positionRequestId, positionRequestData, setPositionRequestData } = useWizardContext();

  const handleFormChange = () => {
    setIsFormModified(true);
  };

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
        // console.log('debounce fetch: ', positionNumber);
        getPositionProfile({ positionNumber, uniqueKey: 'excludedManagerProfile', suppressGlobalError: true });
        trigger('excludedManagerPositionNumber');
      } catch (e) {
        // handled by isError, prevents showing error toast
        console.log(e);
      }
    }, 300),
    [getPositionProfile],
  );

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
      if (positionRequestData?.additional_info?.excluded_mgr_position_number) {
        try {
          // console.log('fetch2: ', positionRequestData?.additional_info?.excluded_mgr_position_number);
          await getPositionProfile({
            positionNumber: positionRequestData.additional_info.excluded_mgr_position_number,
            uniqueKey: 'excludedManagerProfile',
            suppressGlobalError: true,
          }).unwrap();
        } catch (e) {
          setNoPositions(true);
        }
      }
    }
    fetchExcludedManagerProfile();
  }, [positionRequestData?.additional_info?.excluded_mgr_position_number, getPositionProfile]);

  const { data: allLocations } = useGetLocationsQuery();

  const showModal = async ({ skipValidation = false, updateStep = true, step = -1, action = 'next' } = {}) => {
    // console.log('showModal', skipValidation, updateStep);

    if (isFetchingPositionProfile) return; // Do not show the modal while fetching position profile

    // Clear any existing errors on the excludedManagerPositionNumber field
    if (!skipValidation) clearErrors('excludedManagerPositionNumber');

    // Check if noPositions is true and excludedManagerPositionNumber should be filled
    const formValues = getValues();
    // skipValidation = true;
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
      await handleOk(updateStep, step, action);
      return false;
    }

    handleSubmit(
      () => {
        // If the form is valid, show the modal
        // setIsModalVisible(true);
        // console.log('handleOk 1');
        handleOk(updateStep, step, action);
      },
      () => {
        Modal.error({
          title: 'Error',
          content: (
            <div>
              <p>The form contains errors, please fix them before proceeding.</p>
              <p></p>
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

  const handleOk = async (updateStep = true, step = -1, action = 'next') => {
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
        const resp = await updatePositionRequest({
          id: positionRequestId,
          step: step == -1 ? (updateStep ? (action == 'next' ? 2 : 0) : 1) : step,
          // status: 'COMPLETED',
          // position_number: 123456,

          // increment max step only if it's not incremented, and we're not moving back
          ...(updateStep && action == 'next' && (positionRequest?.max_step_completed ?? 0) < 2 && step == -1
            ? { max_step_completed: 2 }
            : {}),

          // attach additional information
          additional_info: {
            department_id: formData.payListDepartmentId ?? undefined,
            work_location_id: formData.workLocation ?? undefined,
            excluded_mgr_position_number:
              !noPositions && formData.excludedManagerPositionNumber != ''
                ? formData.excludedManagerPositionNumber
                : undefined,
            comments: formData.comments,
            branch: formData.branch,
            division: formData.division,
          },
          returnFullObject: true,
        }).unwrap();
        setPositionRequestData(resp.updatePositionRequest ?? null);

        if (onNext && updateStep && action == 'next') onNext();
        if (onBack && updateStep && action == 'back') onBack();
      } else {
        throw Error('Position request not found');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<WizardConfirmDetailsModel>({
    resolver: classValidatorResolver(WizardConfirmDetailsModel),
    defaultValues: {
      workLocation: null as string | null,
      excludedManagerPositionNumber: '',
      payListDepartmentId: null as string | null,
      comments: '',
      branch: '',
      division: '',
    },
  });

  useEffect(() => {
    if (positionRequestData) {
      const { work_location_id, department_id, excluded_mgr_position_number, comments, branch, division } =
        positionRequestData.additional_info ?? {};

      setValue('branch', branch || '');
      setValue('division', division || '');

      setValue(
        'workLocation',
        work_location_id ||
          departmentsData?.find((dept) => dept.id === positionRequestData?.department_id)?.location_id ||
          null,
      );
      setValue('payListDepartmentId', department_id || positionRequestData?.department_id || null);

      const { orgchart_json, reports_to_position_id } = positionRequest ?? {
        orgchart_json: undefined,
        reports_to_position_id: undefined,
      };

      // Find first parent which is an excluded manager
      const lookup =
        orgchart_json != null && reports_to_position_id != null
          ? findExcludedManager(`${reports_to_position_id}`, orgchart_json)
          : undefined;

      const useExcludedMngr = excluded_mgr_position_number || lookup?.id || '';
      setValue('excludedManagerPositionNumber', useExcludedMngr);
      if (!excluded_mgr_position_number && lookup?.id) {
        // console.log('debouncedFetchPositionProfile A: ', useExcludedMngr);
        // fetch only if excluded manager wasn't previously set,  otherwise causes a double fetch because of the uniqueKey = true
        debouncedFetchPositionProfile(useExcludedMngr);
      }

      setValue('comments', comments || '');
    }
  }, [departmentsData, positionRequestData, setValue, debouncedFetchPositionProfile, positionRequest]);

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
      <Menu className="wizard-menu">
        <Menu.Item key="save" onClick={saveAndQuit} data-testid="save-and-quit">
          <div style={{ padding: '5px 0' }}>
            Save and quit
            <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
              Saves your progress. You can access this position request from the 'My Position Requests' page.
            </Typography.Text>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.ItemGroup key="others" title={<b>Others</b>}>
          <Menu.Item key="delete" onClick={deleteRequest}>
            <div style={{ padding: '5px 0' }}>
              Delete
              <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                Removes this position request from 'My Position Requests'. This action is irreversible.
              </Typography.Text>
            </div>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  };

  const switchStep = async (step: number) => {
    if (isFormModified) {
      Modal.confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Do you want to save them before switching steps?',
        okText: 'Save',
        cancelText: 'Cancel',
        onOk: async () => {
          showModal({ step: step });
          setIsFormModified(false);
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
          <div style={{ marginRight: '1rem' }}>
            <StatusIndicator status={positionRequest?.status ?? ''} />
          </div>,
          <AcessiblePopoverMenu
            triggerButton={<Button tabIndex={-1} icon={<EllipsisOutlined />}></Button>}
            content={getMenuContent()}
            ariaLabel="Open position request menu"
          ></AcessiblePopoverMenu>,
          <Button
            onClick={() => showModal({ skipValidation: true, action: 'back' })}
            key="back"
            data-testid="back-button"
          >
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
        <WizardSteps
          onStepClick={switchStep}
          current={1}
          maxStepCompleted={positionRequest?.max_step_completed}
          disabledTooltip={isFetchingPositionProfile ? 'Loading, please wait...' : null}
        ></WizardSteps>

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
                    onChange={handleFormChange}
                  >
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
                                    // console.log('debouncedFetchPositionProfile B: ', e.target.value);
                                    debouncedFetchPositionProfile(e.target.value); // Fetch position profile
                                    onChange(e); // Update controller state
                                  }}
                                  placeholder="Position number"
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

                    <Card
                      title={
                        <span id="excluded-manager-id-label">
                          <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Branch and Division</h3>
                        </span>
                      }
                      bordered={false}
                      className="custom-card"
                      style={{ marginTop: 16 }}
                    >
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={12}>
                          <Form.Item
                            name="branch"
                            label="Branch (please use full name and avoid acronyms)"
                            validateStatus={errors.branch ? 'error' : ''}
                            help={errors.branch?.message}
                          >
                            <Controller name="branch" control={control} render={({ field }) => <Input {...field} />} />
                          </Form.Item>

                          <Form.Item
                            name="division"
                            label="Division"
                            validateStatus={errors.division ? 'error' : ''}
                            help={errors.division?.message}
                          >
                            <Controller
                              name="division"
                              control={control}
                              render={({ field }) => <Input {...field} />}
                            />
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
            </Col>
          </Row>
        </div>
      </WizardPageWrapper>
    </div>
  );
};
