import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Modal, Popover, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import { useGetDepartmentQuery } from '../../redux/services/graphql-api/department.api';
import { JobProfileModel } from '../../redux/services/graphql-api/job-profile-types';
import {
  GetPositionRequestResponseContent,
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

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
  const page_size = import.meta.env.VITE_TEST_ENV === 'true' ? 2 : 10;
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedProfileName, setSelectedProfileName] = useState<string | null>(null);

  const [selectProfileId, setSelectProfileId] = useState<string | null>(null);

  // stores searchParams for when user navigates back from edit page
  // used when user presses "cancel" on the "chage profile?" dialog
  const previousSearchState = useRef('');
  const jobProfileSearchResultsRef = useRef<JobProfileSearchResultsRef>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedClassificationId, setSelectedClassificationId] = useState<string | undefined>();

  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestId, positionRequestData } = useWizardContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setPositionRequestProfileId } = useWizardContext();
  const navigate = useNavigate();

  // get organization for the department in which the position is being created in
  // this will be used to filter the profiles to ones that belong to this organization only
  const { data: departmentData } = useGetDepartmentQuery(positionRequestData?.department_id ?? '');

  // if positionRequestData.parent_job_profile is not null, change searchParams to include selectedProfile
  useEffect(() => {
    if (positionRequestData?.parent_job_profile_id) {
      // check if searchparams already has selectedProfile
      // removed this to make reloading on thepage work after user selected a different profile and reloaded the page
      // if (!searchParams.get('selectedProfile')) {
      // determine what page we need to switch to
      setSelectProfileId(positionRequestData.parent_job_profile_id.toString());
      // setSearchParams({ selectedProfile: positionRequestData.parent_job_profile_id.toString() }, { replace: true });
      // }
    }
  }, [positionRequestData, setSearchParams, searchParams]);

  const getBasePath = (path: string) => {
    if (positionRequestId) return `/my-position-requests/${positionRequestId}`;

    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  };

  const onSubmit = async (action = 'next', switchStep = true, alertNoProfile = true, step = -1): Promise<string> => {
    if (
      positionRequestData?.parent_job_profile_id &&
      positionRequestData?.parent_job_profile_id !== parseInt(selectedProfileId ?? '')
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
          okText: 'Change profile',
          cancelText: 'Cancel',
          onOk: async () => {
            setWizardData(null); // this ensures that any previous edits are cleared
            await handleNext(action, switchStep, alertNoProfile, step > 2 ? 2 : step);
            resolve('CHANGED_PROFILE');
          },
          onCancel: () => {
            // re-select profile on the correct page
            if (previousSearchState.current && jobProfileSearchResultsRef.current) {
              const basePath = getBasePath(location.pathname);

              const searchParams = new URLSearchParams(previousSearchState.current);
              if (searchParams.get('search')) searchParams.delete('search');

              searchParams.set('fetch', 'true');
              searchParams.set('clearFilters', 'true');
              const page = parseInt(searchParams.get('page') || '1', 10);
              jobProfileSearchResultsRef.current.handlePageChange(page);

              navigate(
                {
                  pathname: basePath,
                  search: searchParams.toString(),
                },
                { replace: true },
              );
            }
            resolve('CANCELLED');
          },
        });
      });
    }

    // user is not changing from previous profile
    handleNext(action, switchStep, alertNoProfile, step);
    return 'NO_CHANGE';
  };

  const handleNext = async (action = 'next', switchStep = true, alertNoProfile = true, step = -1) => {
    // we are on the second step of the process (user already selected a position on org chart and is no selecting a profile)
    setIsLoading(true);
    try {
      if (selectedProfileId) {
        // navigate(`/wizard/edit/${selectedProfileId}`);
        if (positionRequestId) {
          await updatePositionRequest({
            id: positionRequestId,
            step: step == -1 ? (action === 'next' ? 2 : 1) : step,
            // increment max step only if it's not incremented
            ...(action === 'next' && positionRequest?.max_step_completed != 2 && step == -1
              ? { max_step_completed: 2 }
              : {}),
            // if user selected same profile as before, do not clear profile_json_updated
            // also do not update title to default
            ...(positionRequestData?.parent_job_profile_id !== parseInt(selectedProfileId ?? '') && {
              additional_info: null,
              profile_json_updated: null,
              title: selectedProfileName ?? undefined,
              max_step_completed: 2,
            }),
            parent_job_profile: { connect: { id: parseInt(selectedProfileId) } },
            classification_id: selectedClassificationId,
          }).unwrap();
        }
        setPositionRequestProfileId(parseInt(selectedProfileId));

        if (action === 'next') {
          if (onNext && switchStep) onNext();
          setSearchParams({}, { replace: true });
        }
      } else {
        // Here you can display an error message.
        if (alertNoProfile) alert('Please select a profile before proceeding.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   if (id) {
  //     setSelectedProfileId(id);
  //   }
  // }, [id]); // picks up profile id from params

  useEffect(() => {
    const selectedProfile = searchParams.get('selectedProfile');
    if (selectedProfile) {
      setSelectedProfileId(selectedProfile);
    } else {
      setSelectedProfileId(null);
    }
  }, [searchParams]); // picks up profile id from search params

  // Ensure form alerts get displayed again
  const { setReqAlertShown, setOriginalValuesSet, setMinReqAlertShown, setWizardData } = useWizardContext();

  setMinReqAlertShown(false);
  setReqAlertShown(false);

  setOriginalValuesSet(false); // ensures original values get re-set once user navigates to edit page

  const back = async () => {
    if (positionRequestId)
      await updatePositionRequest({
        id: positionRequestId,
        step: 0,
      }).unwrap();
    setSearchParams({}, { replace: true });
    if (onBack) onBack();
  };

  const onSelectProfile = (profile: JobProfileModel) => {
    // if there is a profile already associated with the position request, show a warning
    setSelectedProfileName(profile.title.toString());
    setSelectedProfileId(profile.id.toString());
    if (profile?.classifications != null) setSelectedClassificationId(profile?.classifications[0].classification.id);
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
    const res = await onSubmit('quit');
    if (res !== 'CANCELLED') disableBlockingAndNavigateHome();
  };

  const getMenuContent = () => {
    return (
      <Menu>
        <Menu.Item key="save" onClick={saveAndQuit}>
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

  const updatePositionRequestAndSetStep = async (step: number) => {
    if (positionRequestId) {
      setCurrentStep(step);
      // await updatePositionRequest({
      //   id: positionRequestId,
      //   step: step,
      // });
      // refetchPositionRequest();
    }
  };

  const switchStep = async (step: number) => {
    const code = await onSubmit('next', false, false, step);
    if (code == 'NO_CHANGE') updatePositionRequestAndSetStep(step);
    else if (code != 'CANCELLED') updatePositionRequestAndSetStep(2);
    else if (code == 'CANCELLED') return;
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
        <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
          <Button icon={<EllipsisOutlined />}></Button>
        </Popover>,
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
        current={1}
        //  onStepClick={handleStepClick}
        //   hasUnsavedChanges={hasUnsavedChanges}
        maxStepCompleted={positionRequest?.max_step_completed}
        onStepClick={switchStep}
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
          padding: '0 1rem',
        }}
      >
        <JobProfiles
          ref={jobProfileSearchResultsRef}
          searchParams={searchParams}
          onSelectProfile={onSelectProfile}
          page_size={page_size}
          selectProfileId={selectProfileId}
          previousSearchState={previousSearchState}
          // this will filter job profiles by organization in which this position is being created in
          organizationFilterExtra={departmentData?.department?.organization}
        />
      </div>
    </WizardPageWrapper>
  );
};
