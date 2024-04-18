import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../home/components/content-wrapper.component';
import JobProfiles from './components/job-profiles.component';

export const JobProfilesPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      {/* <Space direction="vertical" style={{ width: '100%' }} size="large"> */}
      <PageHeader title="Explore job profiles" subTitle="" />
      {/* <div style={{ padding: '0 1rem' }}> */}
      <ContentWrapper>
        <JobProfiles searchParams={searchParams} />
      </ContentWrapper>
      {/* </div> */}
      {/* </Space> */}
    </>
  );
};
