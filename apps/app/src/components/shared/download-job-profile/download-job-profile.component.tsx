/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { generateJobProfile } from './generate-job-profile.util';

export interface DownloadJobProfileComponentProps {
  jobProfile: Record<string, any> | null;
}

export const DownloadJobProfileComponent = ({
  children,
  jobProfile,
}: DownloadJobProfileComponentProps & React.PropsWithChildren) => {
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const [parentJobProfile, setParentJobProfile] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (jobProfile && !data) {
      trigger({ where: { number: { equals: jobProfile.number } } });
    }

    if (data && data.jobProfilesCount > 0) {
      setParentJobProfile(data.jobProfiles[0]);
    }
  }, [jobProfile, data, trigger]);

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

  return children != null ? (
    isLoading ? (
      <Spin spinning={isLoading} />
    ) : parentJobProfile == null ? (
      <span>disabled</span>
    ) : (
      <span onClick={generate}>{children}</span>
    )
  ) : (
    <Button icon={<DownloadOutlined />} loading={isLoading} disabled={parentJobProfile == null} onClick={generate}>
      Download Job Profile
    </Button>
  );
};
