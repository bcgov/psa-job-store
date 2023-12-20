import { Space } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import JobProfiles from './components/job-profiles.component';

export const JobProfilesPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader title="Job Profiles" subTitle="Find a Job Profile which suits your needs" />
        <div style={{ padding: '0 1rem' }}>
          <JobProfiles searchParams={searchParams} />
        </div>
      </Space>
    </>
  );
};
