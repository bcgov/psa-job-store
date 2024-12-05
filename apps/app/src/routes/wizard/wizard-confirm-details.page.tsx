/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Card, Col, Form, Input, Menu, Modal, Row, Tooltip, Typography } from 'antd';
import { IsNotEmpty } from 'class-validator';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AccessiblePopoverMenu from '../../components/app/common/components/accessible-popover-menu';
import LoadingComponent from '../../components/app/common/components/loading.component';
import '../../components/app/common/css/custom-form.css';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { DepartmentFilter } from '../org-chart/components/department-filter.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardContentWrapper from './components/wizard-content-wrapper';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import StatusIndicator from './components/wizard-position-request-status-indicator';
import { useWizardContext } from './components/wizard.provider';
import { ExcludedManagerPicker } from './excluded-manager-picker';
import './wizard-confirm-details.page.css';

interface WizardConfirmPageProps {
  onNext?: () => void;
  onBack?: () => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
}

export class WizardConfirmDetailsModel {
  @IsNotEmpty({ message: 'Work location is required' })
  workLocation: string | null;

  @IsNotEmpty({ message: 'Department ID is required' })
  payListDepartmentId: string | null;

  @IsNotEmpty({ message: 'Branch is required' })
  branch: string;

  @IsNotEmpty({ message: 'Division is required' })
  division: string;

  @IsNotEmpty({ message: 'First level excluded manager position number is required' })
  excludedManagerPositionNumberAndName: string | null;

  excludedManagerPositionNumber: string | null;
  excludedManagerName: string | null;

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
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const [isFormModified, setIsFormModified] = useState(false);
  const { positionRequestId, positionRequestData, setPositionRequestData } = useWizardContext();
  const [setupDone, setSetupDone] = useState(false);

  // if position request is in "action required" state, this means user is re-submitting the request
  // in this case, disable the org chart step since they should not be able to change the reporting relationship
  // since the position number was already created
  // todo: once update api is available, allow users to make this change
  const isActionRequiredState = positionRequestData?.status == 'ACTION_REQUIRED';

  const handleFormChange = () => {
    setIsFormModified(true);
  };

  const showModal = async ({ skipValidation = false, updateStep = true, step = -1, action = 'next' } = {}) => {
    // console.log('showModal', skipValidation, updateStep);

    // if (isFetchingPositionProfile) return; // Do not show the modal while fetching position profile

    // Clear any existing errors on the excludedManagerPositionNumberAndName field
    // if (!skipValidation) clearErrors('excludedManagerPositionNumberAndName');

    // // Check if noPositions is true and excludedManagerPositionNumberAndName should be filled
    // const formValues = getValues();
    // // console.log('form values: ', formValues);
    // // skipValidation = true;
    // if (
    //   !skipValidation &&
    //   1 != 1
    //   // &&
    //   // ((noPositions && formValues.excludedManagerPositionNumberAndName) ||
    //   //   (firstActivePosition && !firstActivePosition?.employeeName) ||
    //   //   isFetchingPositionProfileError)
    // ) {
    //   // Set an error on the excludedManagerPositionNumberAndName field
    //   // setError('excludedManagerPositionNumberAndName', {
    //   //   type: 'manual',
    //   //   message: noPositions
    //   //     ? 'Position not found'
    //   //     : !firstActivePosition?.employeeName
    //   //       ? 'Position is unencumbered'
    //   //       : 'Position not found',
    //   // });
    //   // console.log('error, returning');
    //   Modal.error({
    //     title: 'Error',
    //     content: (
    //       <div>
    //         <p>The form contains errors, please fix them before proceeding.</p>
    //       </div>
    //     ),
    //     onOk() {},
    //   });
    //   return; // Do not open the modal
    // }

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
            work_location_id: formData.workLocation?.split('|')[0] ?? undefined,
            work_location_name: formData.workLocation?.split('|')[1] ?? undefined,
            excluded_mgr_position_number:
              // !noPositions && formData.excludedManagerPositionNumber != ''
              // ?
              formData.excludedManagerPositionNumberAndName?.split('|')[0] ?? '',
            // : undefined
            excluded_mgr_name: formData.excludedManagerPositionNumberAndName?.split('|')[1] ?? '',
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
    // setError,
    // clearErrors,
    getValues,
    formState: { errors },
    // trigger,
  } = useForm<WizardConfirmDetailsModel>({
    resolver: classValidatorResolver(WizardConfirmDetailsModel),
    defaultValues: {
      workLocation: null as string | null,
      excludedManagerPositionNumber: null as string | null,
      excludedManagerPositionNumberAndName: null as string | null,
      excludedManagerName: null as string | null,
      payListDepartmentId: null as string | null,
      branch: '',
      division: '',
    },
  });

  useEffect(() => {
    if (positionRequestData) {
      const {
        work_location_id,
        work_location_name,
        department_id,
        excluded_mgr_position_number,
        excluded_mgr_name,
        branch,
        division,
      } = positionRequestData.additional_info ?? {};

      setValue('branch', branch || '');
      setValue('division', division || '');

      // work location and name are already present
      if (work_location_id && work_location_name) {
        setValue('workLocation', work_location_id + '|' + work_location_name);
      } else {
        // now handled by department filter inital onSelect callback
        // work location and name are absent, try to find it from the department
        // const dept = departmentsData?.find((dept) => dept.id === positionRequestData?.department_id);
        // setValue('workLocation', dept?.location.id + '|' + dept?.location.name);
      }
      const setDeptIdVal = department_id || positionRequestData?.department_id || null;
      setValue('payListDepartmentId', setDeptIdVal);

      // const { orgchart_json, reports_to_position_id } = positionRequest ?? {
      //   orgchart_json: undefined,
      //   reports_to_position_id: undefined,
      // };

      // // Find first parent which is an excluded manager
      // const lookup =
      //   orgchart_json != null && reports_to_position_id != null
      //     ? findExcludedManager(`${reports_to_position_id}`, orgchart_json)
      //     : undefined;

      const useExcludedMngr = excluded_mgr_position_number || null; //|| lookup?.id || '';
      setValue('excludedManagerPositionNumber', useExcludedMngr);
      // if (!excluded_mgr_position_number && lookup?.id) {
      //   // console.log('debouncedFetchPositionProfile A: ', useExcludedMngr);
      //   // fetch only if excluded manager wasn't previously set,  otherwise causes a double fetch because of the uniqueKey = true
      //   // debouncedFetchPositionProfile(useExcludedMngr);
      // }

      const useExcludedMngrName = excluded_mgr_name || null;
      setValue('excludedManagerName', useExcludedMngrName);

      setValue(
        'excludedManagerPositionNumberAndName',
        useExcludedMngr && useExcludedMngrName ? useExcludedMngr + '|' + useExcludedMngrName : null,
      );

      setSelectedDepartmentId(setDeptIdVal);
      setSetupDone(true);
      console.log('setup done');
    }
  }, [positionRequestData, setValue, positionRequest]); // debouncedFetchPositionProfile

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

  console.log('positionRequest: ', positionRequest);
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
      subTitle={<div>We need a few more pieces of information to action your request for a new position.</div>}
      additionalBreadcrumb={{
        title: positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
      }}
      hpad={false}
      grayBg={false}
      pageHeaderExtra={[
        <div style={{ marginRight: '1rem' }} key="statusIndicator">
          <StatusIndicator status={positionRequest?.status ?? ''} />
        </div>,
        <AccessiblePopoverMenu
          triggerButton={<Button data-testid="ellipsis-menu" tabIndex={-1} icon={<EllipsisOutlined />}></Button>}
          content={getMenuContent()}
          ariaLabel="Open position request menu"
        ></AccessiblePopoverMenu>,
        <Tooltip
          title={
            isActionRequiredState
              ? "Reporting relationship can't be changed once position request has been submitted"
              : ''
          }
        >
          <Button
            onClick={() => showModal({ skipValidation: true, action: 'back' })}
            key="back"
            data-testid="back-button"
            disabled={isActionRequiredState}
          >
            Back
          </Button>
        </Tooltip>,
        <Button
          key="next"
          type="primary"
          onClick={() => showModal()}
          data-testid="next-button"
          loading={isLoading}
          // disabled={isFetchingPositionProfile}
        >
          Save and next
        </Button>,
      ]}
    >
      {!setupDone ? (
        <LoadingComponent />
      ) : (
        <>
          <WizardSteps
            onStepClick={switchStep}
            current={1}
            maxStepCompleted={positionRequest?.max_step_completed}
            // disabledTooltip={isFetchingPositionProfile ? 'Loading, please wait...' : null}
          ></WizardSteps>

          <WizardContentWrapper>
            <Row
              justify="center"
              gutter={16}
              role="form"
              aria-label="additional information"
              data-testid="additional-information-form"
            >
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
                              data-testid="department-select"
                            >
                              <DepartmentFilter
                                setDepartmentId={() => {}}
                                onSelect={(dept) => {
                                  if (dept?.metadata?.value) {
                                    const deptId = dept.metadata.value.toString();
                                    setValue('payListDepartmentId', deptId === undefined ? null : String(deptId));
                                    setValue(
                                      'workLocation',
                                      dept.metadata?.location_id + '|' + dept.metadata?.location_name || null,
                                    );
                                    setSelectedDepartmentId(deptId);
                                  }
                                }}
                                departmentId={selectedDepartmentId}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>

                      <Card
                        title={
                          <>
                            <span id="excluded-manager-id-label">
                              <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Excluded manager</h3>
                            </span>
                            <Typography.Paragraph type="secondary" style={{ fontWeight: 'normal' }}>
                              Please select the excluded manager who approved the use of the job profile.
                            </Typography.Paragraph>
                          </>
                        }
                        bordered={false}
                        className="custom-card"
                        style={{ marginTop: 16 }}
                      >
                        <ExcludedManagerPicker
                          control={control}
                          errors={errors}
                          positionNumber={positionRequestData?.reports_to_position_id?.toString()}
                          positionRequestId={positionRequestId ?? undefined}
                        />
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
                              label="Branch Name (Please use full name, avoid acronyms)"
                              validateStatus={errors.branch ? 'error' : ''}
                              help={errors.branch?.message}
                            >
                              <Controller
                                name="branch"
                                control={control}
                                render={({ field }) => <Input data-testid="branch-input" {...field} />}
                              />
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
                                render={({ field }) => <Input data-testid="division-input" {...field} />}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </WizardContentWrapper>
        </>
      )}
    </WizardPageWrapper>
  );
};
