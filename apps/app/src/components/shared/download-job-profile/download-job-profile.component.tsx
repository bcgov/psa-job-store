/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { generateJobProfile } from 'common-kit';

import { Packer } from 'docx';

import { saveAs } from 'file-saver';
import React, { useCallback, useRef, useState } from 'react';

import { useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { useLazyGetPositionRequestQuery } from '../../../redux/services/graphql-api/position-request.api';
import LoadingComponent from '../../app/common/components/loading.component';

export interface DownloadJobProfileComponentProps {
  jobProfile?: Record<string, any> | null;
  positionRequest?: string;
  positionRequestId?: string;
  style?: React.CSSProperties;
  ignoreAbsentParent?: boolean;
  renderTrigger?: (generate: () => void, isLoading: boolean) => React.ReactNode;
  useModal?: boolean;
  buttonType?: string;
}

export const DownloadJobProfileComponent = ({
  children,
  jobProfile,
  positionRequest,
  positionRequestId,
  style,
  ignoreAbsentParent = false,
  useModal = false,
  renderTrigger,
  buttonType = 'default',
}: DownloadJobProfileComponentProps & React.PropsWithChildren & any) => {
  const [prTrigger, { isFetching: isLoadingPositionRequest }] = useLazyGetPositionRequestQuery();
  const [triggerGetJobProfile, { isFetching }] = useLazyGetJobProfileQuery();

  // const [title, setTitle] = useState<string>();

  //useref for title
  const title = useRef<string>();
  const setTitle = (newTitle: string) => {
    title.current = newTitle;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const downloadDocument = useCallback(
    ({ prData, parentProfileData }: { prData: any; parentProfileData: any }) => {
      let profile = jobProfile ? jobProfile : positionRequest ? positionRequest?.profile_json : prData?.profile_json;

      console.log('downloadDocument(), profile: ', profile);
      if (!profile) return;
      // if profile is being sourced from a position request, we need to merge in the parent profile data to get missing data
      const isPositionRequestProfile = positionRequest != null || prData?.profile_json;
      if (isPositionRequestProfile) {
        console.log('isPositionRequestProfile');
        if (!parentProfileData) {
          console.log('no parentProfileData');
          return;
        }
        profile = { classifications: parentProfileData?.jobProfile?.classifications, ...profile };
      }

      if (profile == null) {
        console.log('profile is null, not generating');
      } else {
        console.log('generaring with profile: ', profile);
      }

      // console.log('positionRequest: ', positionRequest);
      const document =
        profile != null
          ? generateJobProfile({
              jobProfile: profile,
              positionRequest: positionRequest ?? prData,
              supervisorProfile: positionRequest?.reports_to_position ?? prData?.reports_to_position,
            })
          : null;

      if (document != null) {
        console.log('downloading..');
        Packer.toBlob(document).then((blob) => {
          saveAs(blob, title.current);
          message.success('Your document is downloading!');
        });
      }
    },
    [jobProfile, positionRequest, title],
  );

  /*
  Several different paths can request a download. We handle the case where
  - a position request id is passed from a table
  - a position request object is passed from the position request page
  - a job profile is passed from the total comp pages

  in the case where a position request is provided, we also fetch supervisor data
  */
  const fetchData = useCallback(async () => {
    console.log('fetchData');

    console.log('jobProfile: ', jobProfile);

    //we're requesting from from a table, and we need to fetch the data
    if (positionRequestId && !positionRequest) {
      console.log('fetchData prTrigger, positionRequestId: ', positionRequestId);

      const prData = await prTrigger({ id: +positionRequestId }).unwrap();
      const [originalProfile] = await Promise.all([
        triggerGetJobProfile({
          id: prData.positionRequest?.parent_job_profile_id,
          version: prData.positionRequest?.parent_job_profile_version,
        }).unwrap(),
      ]);
      const submittedAt = prData.positionRequest?.submitted_at;
      const positionNumber = prData.positionRequest?.position_number;
      const profileTitle = prData.positionRequest?.title;
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('en-CA') : null;
      setTitle(
        positionNumber
          ? `Job Profile ${positionNumber} ${profileTitle} ${date}.docx`
          : `Job Profile ${profileTitle} ${date}.docx`,
      );
      downloadDocument({ prData: prData.positionRequest, parentProfileData: originalProfile });
    } else if (positionRequest) {
      console.log('fetchData positionRequest exists: ', positionRequest);
      const submittedAt = positionRequest.submitted_at;
      const positionNumber = positionRequest.position_number;
      const profileTitle = positionRequest.title;
      const date = new Date(submittedAt).toLocaleDateString('en-CA');
      setTitle(
        positionNumber
          ? `Job Profile ${positionNumber} ${profileTitle} ${date}.docx`
          : `Job Profile ${profileTitle} ${date}.docx`,
      );
      //fetch the supervisor profile

      console.log(
        'positionProfileData does not exist (profileTrigger): ',
        positionRequest.reports_to_position_id.toString(),
      );
      console.log(' positionRequest: ', positionRequest);
      const [originalProfile] = await Promise.all([
        triggerGetJobProfile({
          id: positionRequest?.parent_job_profile_id,
          version: positionRequest?.parent_job_profile_version,
        }).unwrap(),
      ]);

      downloadDocument({
        prData: positionRequest,
        parentProfileData: originalProfile,
      });
    } else if (jobProfile && !jobProfile.is_archived) {
      setTitle(`Job Profile ${jobProfile.title} ${jobProfile.number}.docx`);
      downloadDocument({ prData: null, parentProfileData: null });
    } else if (jobProfile && jobProfile.is_archived) {
      setTitle(`Job Profile ${jobProfile.title} ${jobProfile.number} Archived.docx`);
      downloadDocument({ prData: null, parentProfileData: null });
    }
  }, [positionRequest, positionRequestId, prTrigger, jobProfile, downloadDocument, triggerGetJobProfile]);

  // console.log('positionProfileData?.positionProfile: ', positionProfileData?.positionProfile);

  // fetch original job profile if necessary so we can get classification info, for example
  // useEffect(() => {
  //   const usePr = positionRequest ?? prData?.positionRequest;
  //   if (usePr) {
  //     triggerGetJobProfile({
  //       id: usePr.parent_job_profile_id,
  //       version: usePr.parent_job_profile_version,
  //     });
  //   }
  // }, [positionRequest, prData?.positionRequest, triggerGetJobProfile]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    fetchData(); // Call the generate function to download the file
  };

  // Custom trigger rendering
  if (renderTrigger) {
    return <>{renderTrigger(fetchData, isLoadingPositionRequest)}</>;
  }

  if (useModal) {
    return children != null ? (
      <>
        <span onClick={() => setIsModalVisible(true)} style={{ position: 'relative' }}>
          {children}{' '}
          {(isLoadingPositionRequest || isFetching) && (
            <span
              className="alignIconTop"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                background: '#ffffff96',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                paddingTop: '5px',
              }}
            >
              {' '}
              <LoadingComponent mode={'small'} />
            </span>
          )}
        </span>
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <WarningFilled style={{ color: 'orange', marginRight: '8px', fontSize: '1.5rem' }} />
              Download profile
            </div>
          }
          open={isModalVisible}
          onOk={handleConfirm}
          onCancel={handleCancel}
          okText="Download profile"
          cancelText="Cancel"
        >
          <p>
            Please note that the profile you are about to download is an editable (.docx) version that has been approved
            for recruitment purposes.
          </p>
          <p>Ensure that the content of the job profile remains unchanged.</p>
        </Modal>
      </>
    ) : (
      <>
        <Button
          style={style}
          icon={<DownloadOutlined />}
          loading={isLoadingPositionRequest || isFetching}
          disabled={jobProfile == null && !ignoreAbsentParent}
          onClick={() => setIsModalVisible(true)}
          type={buttonType}
        >
          Download Job Profile
        </Button>
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <WarningFilled style={{ color: 'orange', marginRight: '8px', fontSize: '1.5rem' }} />
              Download profile
            </div>
          }
          open={isModalVisible}
          onOk={handleConfirm}
          onCancel={handleCancel}
          okText="Download profile"
          cancelText="Cancel"
        >
          <p>
            Please note that the profile you are about to download is an editable (.docx) version that has been approved
            for recruitment purposes.
          </p>
          <p>Ensure that the content of the job profile remains unchanged.</p>
        </Modal>
      </>
    );
  }

  return children != null ? (
    <span
      style={{ position: 'relative' }}
      onClick={async () => {
        console.log('do download');
        await fetchData();
      }}
    >
      {children}
      {(isLoadingPositionRequest || isFetching) && (
        <span
          className="alignIconTop"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            background: '#ffffff96',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            paddingTop: '5px',
          }}
        >
          {' '}
          <LoadingComponent mode={'small'} />
        </span>
      )}
    </span>
  ) : (
    <Button
      style={style}
      icon={<DownloadOutlined />}
      loading={isLoadingPositionRequest || isFetching}
      onClick={fetchData}
    >
      Download Job Profile
    </Button>
  );
};
