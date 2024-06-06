/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { generateJobProfile } from 'common-kit';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import {
  useLazyGetJobProfilesArchivedQuery,
  useLazyGetJobProfilesQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import { useLazyGetPositionRequestQuery } from '../../../redux/services/graphql-api/position-request.api';

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
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const [prTrigger, { data: prData, isLoading: isLoadingPositionRequest }] = useLazyGetPositionRequestQuery();
  const [archiveTrigger, { data: archiveData, isLoading: archiveIsLoading }] = useLazyGetJobProfilesArchivedQuery();
  const [parentJobProfile, setParentJobProfile] = useState<Record<string, any> | null>(null);
  const [title, setTitle] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  function fetchData(): void {
    if (positionRequestId && !positionRequest) {
      //we're requesting from from a table, and we need to fetch the data
      prTrigger({ id: +positionRequestId });
    } else if (positionRequest) {
      const submittedAt = positionRequest.submitted_at;
      const positionNumber = positionRequest.position_number;
      const profileTitle = positionRequest.title;
      const jobStoreNumber = positionRequest.number;
      setTitle(() => {
        const date = new Date(submittedAt).toLocaleDateString('en-CA');
        console.log(date);

        return positionNumber
          ? `Job Profile ${positionNumber} ${profileTitle} ${date}.docx`
          : `Job Profile ${profileTitle} ${date}.docx`;
      });
      trigger({ where: { number: { equals: jobStoreNumber } } });
    } else if (jobProfile && !data && !jobProfile.is_archived) {
      setTitle(`Job Profile ${jobProfile.title} ${jobProfile.number}.docx`);
      trigger({ where: { number: { equals: jobProfile.number } } });
    } else if (jobProfile && !data && jobProfile.is_archived) {
      // we're fetching an archived job profile
      setTitle(`Job Profile ${jobProfile.title} ${jobProfile.number} Archived.docx`);
      archiveTrigger({ where: { number: { equals: jobProfile.number } } });
    }
  }

  useEffect(() => {
    if (prData && !data && !isLoadingPositionRequest) {
      const submittedAt = prData.positionRequest?.submitted_at ?? new Date().toLocaleDateString();
      const positionNumber = prData.positionRequest?.position_number;
      const profileTitle = prData.positionRequest?.profile_json.title.text;
      const jobStoreNumber = prData.positionRequest?.profile_json.number;
      setTitle(() => {
        const date = new Date(submittedAt).toLocaleDateString('en-CA');
        return positionNumber
          ? `Job Profile ${positionNumber} ${profileTitle} ${date}.docx`
          : `Job Profile ${profileTitle} ${date}.docx`;
      });
      trigger({ where: { number: { equals: jobStoreNumber } } });
    }
  }, [trigger, prData, data, isLoadingPositionRequest, title]);

  useEffect(() => {
    if (data && data.jobProfilesCount > 0) {
      setParentJobProfile(data.jobProfiles[0]);
    }
    if (archiveData && archiveData.jobProfilesArchivedCount > 0) {
      setParentJobProfile(archiveData.jobProfilesArchived[0]);
    }
  }, [data, archiveData]);

  useEffect(() => {
    if (parentJobProfile) {
      const generate = () => {
        const profile = jobProfile ?? prData?.positionRequest?.profile_json;
        const document =
          profile != null
            ? generateJobProfile({
                jobProfile: profile,
                parentJobProfile,
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
  }, [jobProfile, parentJobProfile, prData?.positionRequest?.profile_json, title]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    fetchData(); // Call the generate function to download the file
  };

  // Custom trigger rendering
  if (renderTrigger) {
    return <>{renderTrigger(fetchData, isLoading || archiveIsLoading)}</>;
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
          loading={isLoading || archiveIsLoading}
          disabled={parentJobProfile == null && !ignoreAbsentParent}
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
    <Button style={style} icon={<DownloadOutlined />} loading={isLoading || archiveIsLoading} onClick={fetchData}>
      Download Job Profile
    </Button>
  );
};
