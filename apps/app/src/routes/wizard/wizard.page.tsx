import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingComponent from '../../components/shared/loading-component/loading.component';
import PositionProfile from '../../components/shared/position-profile/positionProfile';
import { useGetDepartmentQuery } from '../../redux/services/graphql-api/department.api';
import { JobProfileModel } from '../../redux/services/graphql-api/job-profile-types';
import {
  GetPositionRequestResponseContent,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { useTestUser } from '../../utils/useTestUser';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import { useJobProfilesProvider } from '../job-profiles/components/job-profiles.context';
import WizardContentWrapper from './components/wizard-content-wrapper';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';
import { WizardContextMenu } from './wizard-context-menu';

interface WizardPageProps {
  onBack?: () => void;
  onNext?: () => void;
  disableBlockingAndNavigateHome: () => void;
  positionRequest: GetPositionRequestResponseContent | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
}

interface JobProfileSearchResultsRef {
  handlePageChange: (page: number) => void;
}

export const WizardPage: React.FC<WizardPageProps> = ({
  onNext,
  onBack,
  disableBlockingAndNavigateHome,
  positionRequest,
  setCurrentStep,
}) => {
  // const { id } = useParams();
  const isTestUser = useTestUser();
  const page_size = isTestUser ? 2 : 10;
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedProfileVersion, setSelectedProfileVersion] = useState<string | null>(null);
  const [selectedProfileNumber, setSelectedProfileNumber] = useState<string | null>(null);
  const [selectedProfileName, setSelectedProfileName] = useState<string | null>(null);
  const { setShouldFetch, setClearingFilters, setReselectOriginalWizardProfile } = useJobProfilesProvider();
  const [selectProfileNumber, setSelectProfileNumber] = useState<string | null>(null);

  // stores searchParams for when user navigates back from edit page
  // used when user presses "cancel" on the "chage profile?" dialog
  const previousSearchState = useRef('');
  const jobProfileSearchResultsRef = useRef<JobProfileSearchResultsRef>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState<{
    id: string;
    employee_group_id: string;
    peoplesoft_id: string;
  }>({ id: '', employee_group_id: '', peoplesoft_id: '' });

  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const {
    positionRequestId,
    positionRequestData,
    setPositionRequestData,
    setPositionRequestProfileId,
    setPositionRequestProfileVersion,
    setReqAlertShown,
    setOriginalValuesSet,
    setMinReqAlertShown,
    setWizardData,
  } = useWizardContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // get organization for the department in which the position is being created in
  // this will be used to filter the profiles to ones that belong to this organization only
  const { data: departmentData } = useGetDepartmentQuery(positionRequestData?.department_id ?? '');

  // if positionRequestData.parent_job_profile is not null, change searchParams to include selectedProfile
  useEffect(() => {
    if (positionRequestData?.parent_job_profile?.number) {
      // check if searchparams already has selectedProfile
      // removed this to make reloading on thepage work after user selected a different profile and reloaded the page
      // if (!searchParams.get('selectedProfile')) {
      // determine what page we need to switch to
      setSelectProfileNumber(positionRequestData?.parent_job_profile?.number.toString());
      // setSearchParams({ selectedProfile: positionRequestData.parent_job_profile_id.toString() }, { replace: true });
      // }
    }
  }, [positionRequestData, setSearchParams, searchParams]);

  const [isSwitchStepLoading, setIsSwitchStepLoading] = useState(false);

  const onSubmit = async (
    action = 'next',
    switchToNextStep = true,
    alertNoProfile = true,
    step = -1,
  ): Promise<string> => {
    // console.log(
    //   'onSubmit: ',
    //   action,
    //   switchToNextStep,
    //   alertNoProfile,
    //   step,
    //   positionRequestData?.parent_job_profile?.number,
    //   parseInt(selectedProfileNumber ?? ''),
    // );

    // if user is changing the profile, show a warning
    // must be on step 3 or higher to show a warning (indicates there may have been edits done on existing profile)
    if (
      positionRequestData?.parent_job_profile?.number &&
      positionRequestData?.parent_job_profile?.number !== parseInt(selectedProfileNumber ?? '') &&
      (positionRequestData?.max_step_completed ?? 0) >= 3
    ) {
      return new Promise((resolve) => {
        Modal.confirm({
          title: 'Change profile?',
          content: (
            <div data-testid="change-profile-warning">
              <p>
                Changing the job profile will result in the loss of all profile data and any additional details you've
                provided.
              </p>
              <p>This action is irreversible. Are you sure you wish to proceed?</p>
            </div>
          ),
          okButtonProps: {
            loading: isSwitchStepLoading,
          },
          cancelButtonProps: {
            loading: isSwitchStepLoading,
          },
          okText: 'Change profile',
          cancelText: 'Cancel',
          onOk: async () => {
            setIsSwitchStepLoading(true);
            // setWizardData(null); // this ensures that any previous edits are cleared
            // await handleNext(action, switchToNextStep, alertNoProfile, step > 2 ? 2 : step, 'CHANGED_PROFILE');
            // setIsSwitchStepLoading(false);
            // resolve('CHANGED_PROFILE');
            return new Promise((resolveOk) => {
              setWizardData(null); // this ensures that any previous edits are cleared
              handleNext(action, switchToNextStep, alertNoProfile, step > 3 ? 3 : step, 'CHANGED_PROFILE').then(() => {
                setIsSwitchStepLoading(false);
                resolve('CHANGED_PROFILE');
                resolveOk(undefined);
              });
            });
          },
          onCancel: () => {
            // re-select profile on the correct page
            // console.log('previousSearchState.current: ', previousSearchState.current);
            // console.log('jobProfileSearchResultsRef.current: ', jobProfileSearchResultsRef.current);

            if (previousSearchState.current && jobProfileSearchResultsRef.current) {
              // const basePath = getBasePath(location.pathname);

              const searchParams = new URLSearchParams(previousSearchState.current);
              if (searchParams.get('search')) searchParams.delete('search');

              setShouldFetch(true);
              // console.log('setting clearing filters 5');
              setClearingFilters(true);
              setReselectOriginalWizardProfile(true);
              // searchParams.set('clearFilters', 'true');
              const page = parseInt(searchParams.get('page') || '1', 10);
              jobProfileSearchResultsRef.current.handlePageChange(page);

              // console.log('navigating to: ', basePath, searchParams.toString());

              setSearchParams(searchParams, { replace: true });
              // navigate(
              //   {
              //     pathname: basePath,
              //     search: searchParams.toString(),
              //   },
              //   { replace: true },
              // );
            }
            resolve('CANCELLED');
          },
        });
      });
    }

    // user is not changing from previous profile
    handleNext(action, switchToNextStep, alertNoProfile, step, 'NO_CHANGE');
    return 'NO_CHANGE';
  };

  const handleNext = async (action = 'next', switchToNextStep = true, alertNoProfile = true, step = -1, state = '') => {
    // console.log('handleNext: ', action, switchToNextStep, alertNoProfile, step, state);

    // we are on the second step of the process (user already selected a position on org chart and is no selecting a profile)
    setIsLoading(true);
    try {
      if (selectedProfileNumber && selectedProfileId && selectedProfileVersion) {
        if (positionRequestId) {
          // we're either changing the profile or proceeding to the next step without change via "next" button
          if (state == 'CHANGED_PROFILE' || (state == 'NO_CHANGE' && switchToNextStep)) {
            const updateArgs = {
              id: positionRequestId,
              // action is either "next" or "quit"
              // step is specified if user clicks on wizard
              // so:
              // - if user is quitting, set step to profile selection screen (2)
              // - if user proceeding to next step, set step to edit form (3)
              // - if user is clicking on the wizard, set step to that
              //   - if user changed profile, this step is going to be no more than 3 (force users to edit page)
              //   - if user didn't change profile, they can switch to any step
              step: step == -1 ? (action === 'next' ? 3 : 2) : step,

              // increment max step only if it's not incremented
              // and the user is proceeding to the next step
              ...(action === 'next' && (positionRequest?.max_step_completed ?? 0) < 3 && step == -1
                ? { max_step_completed: 3 }
                : {}),
              // if user selected a different profile than the one already associated with the position request
              // clear profile_json, set title to the selected profile name, and set max_step_completed to 3
              ...(positionRequestData?.parent_job_profile?.number &&
                positionRequestData?.parent_job_profile?.number !== parseInt(selectedProfileNumber ?? '') && {
                  profile_json: null,
                  title: selectedProfileName ?? undefined,
                  // set this only if max step is greater than 3
                  ...((positionRequestData?.max_step_completed ?? 0 > 3) ? { max_step_completed: 3 } : {}),
                }),
              parent_job_profile: {
                connect: { id_version: { id: parseInt(selectedProfileId), version: parseInt(selectedProfileVersion) } },
              },
              classification: {
                connect: {
                  id_employee_group_id_peoplesoft_id: {
                    id: selectedClassification.id,
                    employee_group_id: selectedClassification.employee_group_id,
                    peoplesoft_id: selectedClassification.peoplesoft_id,
                  },
                },
              },
              returnFullObject: true,
            };

            // console.log('updatingPositionRequest args: ', updateArgs);
            const resp = await updatePositionRequest(updateArgs).unwrap();

            setPositionRequestData(resp.updatePositionRequest ?? null);
          }
        }
        setPositionRequestProfileId(parseInt(selectedProfileId));
        setPositionRequestProfileVersion(parseInt(selectedProfileVersion));

        if (action === 'next') {
          if (onNext && switchToNextStep) {
            // console.log('onNext callback');
            onNext();
          }
          // console.log('setSearchParams to blank 1');
          setSearchParams({}, { replace: true });
        }
      } else {
        // Here you can display an error message.
        if (alertNoProfile && action != 'quit') alert('Please select a profile before proceeding.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const selectedProfile = searchParams.get('selectedProfile');
    // console.log('seletedProfile hook: ', selectedProfile);
    if (selectedProfile) {
      setSelectedProfileNumber(selectedProfile);
    } else {
      setSelectedProfileId(null);
      setSelectedProfileVersion(null);
      setSelectedProfileNumber(null);
    }
  }, [searchParams]); // picks up profile id from search params

  useEffect(() => {
    // console.log('SET SET');
    setMinReqAlertShown(false);
    setReqAlertShown(false);
    setOriginalValuesSet(false); // ensures original values get re-set once user navigates to edit page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const back = async () => {
    if (positionRequestId)
      await updatePositionRequest({
        id: positionRequestId,
        step: 0,
      }).unwrap();
    // console.log('setSearchParams to blank 2');
    setSearchParams({}, { replace: true });
    if (onBack) onBack();
  };

  const onSelectProfile = (profile: JobProfileModel) => {
    // console.log('onSelectProfile: ', profile);
    // if there is a profile already associated with the position request, show a warning
    setSelectedProfileName(profile.title.toString());
    setSelectedProfileId(profile.id.toString());
    setSelectedProfileVersion(profile.version.toString());
    setSelectedProfileNumber(profile.number.toString());

    if (profile?.classifications != null) {
      const classification = {
        id: profile.classifications[0].classification.id,
        employee_group_id: profile.classifications[0].classification.employee_group_id,
        peoplesoft_id: profile.classifications[0].classification.peoplesoft_id,
      };

      if (JSON.stringify(selectedClassification) !== JSON.stringify(classification)) {
        setSelectedClassification({
          id: profile.classifications[0].classification.id,
          employee_group_id: profile.classifications[0].classification.employee_group_id,
          peoplesoft_id: profile.classifications[0].classification.peoplesoft_id,
        });
      }
    }
  };

  // const [deletePositionRequest] = useDeletePositionRequestMutation();
  // const deleteRequest = async () => {
  //   if (!positionRequestId) return;
  //   Modal.confirm({
  //     title: 'Delete Position Request',
  //     content: 'Do you want to delete the position request?',
  //     okText: 'Yes',
  //     cancelText: 'No',
  //     onOk: async () => {
  //       await deletePositionRequest({ id: positionRequestId });
  //       disableBlockingAndNavigateHome();
  //     },
  //   });
  // };

  const saveAndQuit = async () => {
    const res = await onSubmit('quit');
    if (res !== 'CANCELLED') disableBlockingAndNavigateHome();
  };

  // const getMenuContent = () => {
  //   return (
  //     <Menu className="wizard-menu">
  //       <Menu.Item key="save" onClick={saveAndQuit}>
  //         <div style={{ padding: '5px 0' }}>
  //           Save and quit
  //           <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
  //             Saves your progress. You can access this position request from the 'My Position Requests' page.
  //           </Typography.Text>
  //         </div>
  //       </Menu.Item>
  //       <Menu.Divider />
  //       <Menu.ItemGroup key="others" title={<b>Others</b>}>
  //         <Menu.Item key="delete" onClick={deleteRequest}>
  //           <div style={{ padding: '5px 0' }}>
  //             Delete
  //             <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
  //               Removes this position request from 'My Position Requests'. This action is irreversible.
  //             </Typography.Text>
  //           </div>
  //         </Menu.Item>
  //       </Menu.ItemGroup>
  //     </Menu>
  //   );
  // };

  const updatePositionRequestAndSetStep = async (step: number) => {
    if (positionRequestId) {
      setCurrentStep(step);
      await updatePositionRequest({
        id: positionRequestId,
        step: step,
      });
      // refetchPositionRequest();
    }
  };

  const switchStep = async (step: number) => {
    // console.log('switchStep: ', step);
    const code = await onSubmit('next', false, false, step);
    if (code == 'NO_CHANGE') {
      updatePositionRequestAndSetStep(step);
    } else if (code != 'CANCELLED') {
      updatePositionRequestAndSetStep(2);
    } else if (code == 'CANCELLED') return;
  };

  if (!departmentData) return <LoadingComponent></LoadingComponent>;

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
      subTitle={
        <div>
          <PositionProfile
            prefix="Reporting to"
            mode="compact"
            positionNumber={positionRequestData?.reports_to_position_id}
            positionProfile={positionRequestData?.reports_to_position}
            orgChartData={positionRequestData?.orgchart_json}
          ></PositionProfile>
        </div>
      }
      additionalBreadcrumb={{
        title: positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
      }}
      hpad={false}
      grayBg={false}
      pageHeaderExtra={[
        <WizardContextMenu
          positionRequestId={positionRequestId}
          onSaveAndQuit={saveAndQuit}
          onNavigateHome={disableBlockingAndNavigateHome}
          shareableLink={positionRequest?.shareUUID}
          positionRequestStatus={positionRequest?.status}
        />,
        <Button onClick={back} key="back" data-testid="back-button">
          Back
        </Button>,
        <Button
          key="next"
          type="primary"
          disabled={selectedProfileId == null}
          onClick={() => onSubmit()}
          data-testid="next-button"
          loading={isLoading}
        >
          Save and next
        </Button>,
      ]}
    >
      <WizardSteps
        current={2}
        //  onStepClick={handleStepClick}
        //   hasUnsavedChanges={hasUnsavedChanges}
        maxStepCompleted={positionRequest?.max_step_completed}
        onStepClick={switchStep}
        disabledTooltip={selectedProfileId == null ? 'Please select a profile before proceeding.' : null}
        disableTooltipForBasicInfo={false} // allow stepping back to basic info even if profile is not selected
      ></WizardSteps>
      <WizardContentWrapper>
        <JobProfiles
          key={'WizardProfiles'}
          ref={jobProfileSearchResultsRef}
          onSelectProfile={onSelectProfile}
          page_size={page_size}
          selectProfileNumber={selectProfileNumber}
          previousSearchState={previousSearchState}
          // this will filter job profiles by organization in which this position is being created in
          organizationFilterExtra={departmentData?.department?.organization}
          prData={positionRequestData}
        />
      </WizardContentWrapper>
    </WizardPageWrapper>
  );
};
