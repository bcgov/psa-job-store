import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import { useTestUser } from '../../utils/useTestUser';
import JobProfiles from './components/job-profiles.component';
import { JobProfilesProvider } from './components/job-profiles.context';

export const JobProfilesPage = () => {
  const { number } = useParams();
  const isTestUser = useTestUser();
  const page_size = isTestUser ? 2 : 10;

  return (
    <>
      {/* <Space direction="vertical" style={{ width: '100%' }} size="large"> */}
      <PageHeader
        title="Explore job profiles"
        subTitle="To search profiles, please choose filters to access.  Please note you will be able to see profiles, however position creation options may be limited by your organization structure or reporting relationship."
      />
      {/* <div style={{ padding: '0 1rem' }}> */}
      <ContentWrapper>
        <JobProfilesProvider>
          <JobProfiles key={'SearchProfiles'} page_size={page_size} selectProfileNumber={number} showVersions={true} />
        </JobProfilesProvider>
      </ContentWrapper>
      {/* </div> */}
      {/* </Space> */}
    </>
  );
};
