/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { generateJobProfile } from 'common-kit';

import { Packer } from 'docx';

import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

import { useLazyGetPositionRequestQuery } from '../../../redux/services/graphql-api/position-request.api';
import { useLazyGetPositionProfileQuery } from '../../../redux/services/graphql-api/position.api';

export interface DownloadJobProfileComponentProps {
  jobProfile?: Record<string, any> | null;
  positionRequest?: string;
  positionRequestId?: string;
  style?: React.CSSProperties;
  ignoreAbsentParent?: boolean;
  renderTrigger?: (generate: () => void, isLoading: boolean) => React.ReactNode;
  useModal?: boolean;
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
}: DownloadJobProfileComponentProps & React.PropsWithChildren & any) => {
  const [prTrigger, { data: prData, isLoading: isLoadingPositionRequest }] = useLazyGetPositionRequestQuery();
  const [profileTrigger, { data: positionProfileData, isLoading: profileIsLoading }] = useLazyGetPositionProfileQuery();
  const [title, setTitle] = useState<string>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [doDownload, setDoDownload] = useState<boolean>(false);

  /*
  Several different paths can request a download. We handle the case where
  - a position request id is passed from a table
  - a position request object is passed from the position request page
  - a job profile is passed from the total comp pages

  in the case where a position request is provided, we also fetch supervisor data
  */
  function fetchData(): void {
    if (positionRequestId && !positionRequest) {
      //we're requesting from from a table, and we need to fetch the data
      prTrigger({ id: +positionRequestId });
    } else if (positionRequest) {
      const submittedAt = positionRequest.submitted_at;
      const positionNumber = positionRequest.position_number;
      const profileTitle = positionRequest.title;
      setTitle(() => {
        const date = new Date(submittedAt).toLocaleDateString('en-CA');
        console.log(date);

        return positionNumber
          ? `Job Profile ${positionNumber} ${profileTitle} ${date}.docx`
          : `Job Profile ${profileTitle} ${date}.docx`;
      });
      //fetch the supervisor profile
      positionProfileData
        ? setDoDownload(true)
        : profileTrigger({ positionNumber: positionRequest.additional_info.excluded_mgr_position_number.toString() });
    } else if (jobProfile && !jobProfile.is_archived) {
      setTitle(`Job Profile ${jobProfile.title} ${jobProfile.number}.docx`);
      setDoDownload(true);
    } else if (jobProfile && jobProfile.is_archived) {
      setTitle(`Job Profile ${jobProfile.title} ${jobProfile.number} Archived.docx`);
      setDoDownload(true);
    }
  }

  useEffect(() => {
    if (prData && !isLoadingPositionRequest) {
      const submittedAt = prData.positionRequest?.submitted_at ?? new Date().toLocaleDateString();
      const positionNumber = prData.positionRequest?.position_number;
      const profileTitle = prData.positionRequest?.profile_json.title.text;
      setTitle(() => {
        const date = new Date(submittedAt).toLocaleDateString('en-CA');
        return positionNumber
          ? `Job Profile ${positionNumber} ${profileTitle} ${date}.docx`
          : `Job Profile ${profileTitle} ${date}.docx`;
      });
      if (prData.positionRequest?.excluded_manager_position) {
        setDoDownload(true);
      } else {
        const supervisorPosition = prData.positionRequest?.additional_info?.excluded_mgr_position_number;
        supervisorPosition && profileTrigger({ positionNumber: supervisorPosition.toString() });
      }
    }
  }, [prData, isLoadingPositionRequest, title, profileTrigger]);

  //controls when the download happens.
  useEffect(() => {
    if (!profileIsLoading && positionProfileData) {
      setDoDownload(true);
    }
  }, [positionProfileData, profileIsLoading]);

  // console.log('positionProfileData?.positionProfile: ', positionProfileData?.positionProfile);

  useEffect(() => {
    if (doDownload) {
      setDoDownload(false);
      const generate = () => {
        const profile = jobProfile
          ? jobProfile
          : positionRequest
            ? positionRequest?.profile_json
            : prData?.positionRequest?.profile_json;
        const document =
          profile != null
            ? generateJobProfile({
                jobProfile: profile,
                positionRequest: positionRequest ?? prData?.positionRequest,
                supervisorProfile:
                  prData?.positionRequest?.excluded_manager_position ?? positionProfileData?.positionProfile[0],
              })
            : null;

        if (document != null) {
          Packer.toBlob(document).then((blob) => {
            saveAs(blob, title);
          });
        }
      };
      generate();
    }
  }, [doDownload, jobProfile, positionProfileData, positionRequest, prData?.positionRequest, profileIsLoading, title]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    fetchData(); // Call the generate function to download the file
  };

  // Custom trigger rendering
  if (renderTrigger) {
    return <>{renderTrigger(fetchData, isLoadingPositionRequest || profileIsLoading)}</>;
  }

  if (useModal) {
    return children != null ? (
      <>
        <span onClick={() => setIsModalVisible(true)}>{children}</span>
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
          loading={isLoadingPositionRequest || profileIsLoading}
          disabled={jobProfile == null && !ignoreAbsentParent}
          onClick={() => setIsModalVisible(true)}
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
      onClick={() => {
        console.log('do download');
        fetchData();
      }}
    >
      {children}
    </span>
  ) : (
    <Button
      style={style}
      icon={<DownloadOutlined />}
      loading={isLoadingPositionRequest || profileIsLoading}
      onClick={fetchData}
    >
      Download Job Profile
    </Button>
  );
};
