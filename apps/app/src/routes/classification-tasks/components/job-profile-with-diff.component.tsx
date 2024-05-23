/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from 'antd';
import { useState } from 'react';
import { JobProfile } from '../../job-profiles/components/job-profile.component';
import WizardEditControlBar from '../../wizard/components/wizard-edit-control-bar';

type JobProfileTabProps = {
  positionRequestData: any;
};

export const JobProfileWithDiff = ({ positionRequestData }: JobProfileTabProps) => {
  const [showDiff, setShowDiff] = useState(true);

  const handleToggleShowDiff = (checked: boolean) => {
    setShowDiff(checked);
  };

  // PROFILE TAB INFO - todo: use wizard-reivew.page.tsx instead, make it configurable
  // const collapseRef = useRef<HTMLDivElement>(null);

  // const [hasScrolledPast, setHasScrolledPast] = useState(false);

  // const handleScroll = () => {
  //   const layoutScrollContainer = document.querySelector('.ant-layout > div > div') as HTMLElement;
  //   if (layoutScrollContainer && collapseRef.current) {
  //     const collapseTop = collapseRef.current.getBoundingClientRect().top;
  //     const containerTop = layoutScrollContainer.getBoundingClientRect().top;

  //     // Check if the Collapse top is above the container top
  //     setHasScrolledPast(collapseTop < containerTop);
  //   }
  // };

  // useEffect(() => {
  //   const layoutScrollContainer = document.querySelector('.ant-layout > div > div');
  //   if (layoutScrollContainer) {
  //     layoutScrollContainer.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (layoutScrollContainer) {
  //       layoutScrollContainer.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, []);

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={20} xl={16}>
        <WizardEditControlBar
          onToggleShowDiff={handleToggleShowDiff}
          showDiffToggle={true}
          showDiff={showDiff}
          showNext={false}
        />
        {/* <Collapse
          ref={collapseRef}
          bordered={false}
          ghost
          activeKey={showDiff ? ['1'] : []} // Control the active key based on showDiff
          className={hasScrolledPast ? 'no-animation' : ''}
        >
          <Collapse.Panel key="1" showArrow={false} header="">
            {diffLegendContent}
          </Collapse.Panel>
        </Collapse> */}
        <JobProfile
          style={{ marginTop: '1rem' }}
          profileData={positionRequestData?.positionRequest?.profile_json_updated}
          showBackToResults={false}
          showDiff={showDiff}
          id={positionRequestData?.positionRequest?.parent_job_profile_id?.toString() ?? undefined}
        />
      </Col>
    </Row>
  );
};
