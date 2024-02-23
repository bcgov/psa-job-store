import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Modal, Popover, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import PositionProfile from '../../components/app/common/components/positionProfile';
import { JobProfileModel } from '../../redux/services/graphql-api/job-profile-types';
import {
  useDeletePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import JobProfiles from '../job-profiles/components/job-profiles.component';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

interface IFormInput {
  firstName: string;
  lastName: string;
}

interface WizardPageProps {
  onBack?: () => void;
  onNext?: () => void;
  disableBlockingAndNavigateHome: () => void;
}

export const WizardPage: React.FC<WizardPageProps> = ({ onNext, onBack, disableBlockingAndNavigateHome }) => {
  // const { id } = useParams();
  const { handleSubmit } = useForm<IFormInput>();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedClassificationId, setSelectedClassificationId] = useState<string | undefined>();

  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestId, positionRequestData } = useWizardContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setPositionRequestProfileId } = useWizardContext();

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    // we are on the second step of the process (user already selected a position on org chart and is no selecting a profile)
    if (selectedProfileId) {
      // navigate(`/wizard/edit/${selectedProfileId}`);
      if (positionRequestId)
        await updatePositionRequest({
          id: positionRequestId,
          step: 2,
          profile_json: null,
          parent_job_profile: { connect: { id: parseInt(selectedProfileId) } },
          classification_id: selectedClassificationId,
        }).unwrap();
      setPositionRequestProfileId(parseInt(selectedProfileId));
      if (onNext) onNext();
      setSearchParams({}, { replace: true });
      // navigate(`/org-chart/${reportingPosition}/profiles/edit/${selectedProfileId}`);
    } else {
      // Here you can display an error message.
      alert('Please select a profile before proceeding.');
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
  setWizardData(null); // this ensures that any previous edits are cleared

  const back = async () => {
    if (positionRequestId)
      await updatePositionRequest({
        id: positionRequestId,
        step: 0,
      }).unwrap();
    if (onBack) onBack();
  };

  const onSelectProfile = (profile: JobProfileModel) => {
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

  const getMenuContent = () => {
    return (
      <Menu>
        <Menu.Item key="save" onClick={disableBlockingAndNavigateHome}>
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

  return (
    <WizardPageWrapper
      title={
        <div>
          <Link to="/">
            <ArrowLeftOutlined style={{ color: 'black', marginRight: '1rem' }} />
          </Link>
          New position
        </div>
      }
      subTitle={
        <div>
          <PositionProfile
            prefix="Reporting to"
            mode="compact"
            positionNumber={positionRequestData?.reports_to_position_id}
          ></PositionProfile>
        </div>
      }
      additionalBreadcrumb={{ title: 'New position' }}
      // subTitle="Choose a job profile to modify for the new positions"
      hpad={false}
      grayBg={false}
      pageHeaderExtra={[
        <Popover content={getMenuContent()} trigger="click" placement="bottomRight">
          <Button icon={<EllipsisOutlined />}></Button>
        </Popover>,
        <Button onClick={back} key="back">
          Back
        </Button>,
        <Button
          key="next"
          type="primary"
          disabled={selectedProfileId == null}
          onClick={handleSubmit(onSubmit)}
          data-testid="next-button"
        >
          Save and next
        </Button>,
      ]}
    >
      <WizardSteps current={1}></WizardSteps>
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
          searchParams={searchParams}
          onSelectProfile={onSelectProfile}
          // onUseProfile={handleSubmit(onSubmit)}
        />
      </div>
    </WizardPageWrapper>
  );
};
