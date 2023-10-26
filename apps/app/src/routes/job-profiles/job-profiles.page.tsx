import { PageHeader } from '@ant-design/pro-layout';
import { Space } from 'antd';
import { useSearchParams } from 'react-router-dom';
import JobProfiles from './components/job-profiles.component';

export const JobProfilesPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader title="Job Profiles" subTitle="Find a Job Profile which suits your needs" />
        <JobProfiles searchQuery={searchQuery} />
      </Space>
    </>
  );
};
