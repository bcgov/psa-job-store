/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row } from 'antd';
import { ColProps, RowProps } from 'antd/lib/grid';
import { useState } from 'react';
import { JobProfile } from '../../job-profiles/components/job-profile.component';
import WizardEditControlBar from '../../wizard/components/wizard-edit-control-bar';

type JobProfileTabProps = {
  positionRequestData: any;
  showBasicInfo?: boolean;
  controlBarStyle?: React.CSSProperties;
  rowProps?: RowProps;
  colProps?: ColProps;
};

export const JobProfileWithDiff = ({
  positionRequestData,
  showBasicInfo = false,
  controlBarStyle,
  rowProps,
  colProps,
}: JobProfileTabProps) => {
  const [showDiff, setShowDiff] = useState(true);

  const handleToggleShowDiff = (checked: boolean) => {
    setShowDiff(checked);
  };

  return (
    <Row {...rowProps}>
      <Col {...colProps}>
        <Card bodyStyle={{ padding: '0' }}>
          <WizardEditControlBar
            style={controlBarStyle}
            onToggleShowDiff={handleToggleShowDiff}
            showDiffToggle={true}
            showDiff={showDiff}
            showNext={false}
          />
        </Card>
        <JobProfile
          style={{ marginTop: '1rem' }}
          profileData={positionRequestData?.positionRequest?.profile_json}
          showBackToResults={false}
          showBasicInfo={showBasicInfo}
          showDiff={showDiff}
          parentJobProfileId={positionRequestData?.positionRequest?.parent_job_profile_id}
          parentJobProfileVersion={positionRequestData?.positionRequest?.parent_job_profile_version}
        />
      </Col>
    </Row>
  );
};
