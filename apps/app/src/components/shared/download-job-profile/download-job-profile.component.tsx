/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import { generateJobProfile } from 'common-kit';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import {
  useLazyGetJobProfilesArchivedQuery,
  useLazyGetJobProfilesQuery,
} from '../../../redux/services/graphql-api/job-profile.api';

export interface DownloadJobProfileComponentProps {
  jobProfile: Record<string, any> | null;
  style?: React.CSSProperties;
  ignoreAbsentParent?: boolean;
  renderTrigger?: (generate: () => void, isLoading: boolean) => React.ReactNode;
  useModal?: boolean;
}

export const DownloadJobProfileComponent = ({
  children,
  jobProfile,
  style,
  ignoreAbsentParent = false,
  useModal = false,
  renderTrigger,
}: DownloadJobProfileComponentProps & React.PropsWithChildren & any) => {
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const [archiveTrigger, { data: archiveData, isLoading: archiveIsLoading }] = useLazyGetJobProfilesArchivedQuery();
  const [parentJobProfile, setParentJobProfile] = useState<Record<string, any> | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (jobProfile && !data && !jobProfile.is_archived) {
      trigger({ where: { number: { equals: jobProfile.number } } });
    } else {
      archiveTrigger({ where: { number: { equals: jobProfile.number } } });
    }

    if (data && data.jobProfilesCount > 0) {
      setParentJobProfile(data.jobProfiles[0]);
    }
    if (archiveData && archiveData.jobProfilesArchivedCount > 0) {
      setParentJobProfile(archiveData.jobProfilesArchived[0]);
    }
  }, [jobProfile, data, trigger, archiveData, archiveTrigger]);

  const doc = () =>
    jobProfile != null
      ? generateJobProfile({
          jobProfile,
          parentJobProfile,
        })
      : null;

  const generate = () => {
    const document = doc();

    if (document != null) {
      Packer.toBlob(document).then((blob) => {
        saveAs(blob, 'job-profile.docx');
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    generate(); // Call the generate function to download the file
  };

  // Custom trigger rendering
  if (renderTrigger) {
    return <>{renderTrigger(generate, isLoading || archiveIsLoading)}</>;
  }

  if (useModal) {
    return children != null ? (
      archiveIsLoading || isLoading ? (
        <Spin spinning={isLoading || archiveIsLoading} />
      ) : parentJobProfile == null ? (
        <span>disabled</span>
      ) : (
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
              Please note that the profile you are about to download is an editable (.docx) version that has been
              approved for recruitment purposes.
            </p>
            <p>Ensure that the content of the job profile remains unchanged.</p>
          </Modal>
        </>
      )
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
    isLoading ? (
      <Spin spinning={isLoading || archiveIsLoading} />
    ) : parentJobProfile == null ? (
      <span>disabled</span>
    ) : (
      <span onClick={generate}>{children}</span>
    )
  ) : (
    <Button
      style={style}
      icon={<DownloadOutlined />}
      loading={isLoading || archiveIsLoading}
      disabled={parentJobProfile == null && !ignoreAbsentParent}
      onClick={generate}
    >
      Download Job Profile
    </Button>
  );
};
