import { useParams, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import { useTestUser } from '../../utils/useTestUser';
import JobProfiles from './components/job-profiles.component';

export const JobProfilesPage = () => {
  const { number } = useParams();
  const [searchParams] = useSearchParams();
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
        <JobProfiles
          key={'SearchProfiles'}
          searchParams={searchParams}
          page_size={page_size}
          selectProfileNumber={number}
          showVersions={true}
        />
      </ContentWrapper>
      {/* </div> */}
      {/* </Space> */}
    </>
  );
};
