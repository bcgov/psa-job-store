/* eslint-disable @typescript-eslint/no-explicit-any */
import { Empty, Skeleton, Typography } from 'antd';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { GetJobProfilesResponse } from '../../../redux/services/graphql-api/job-profile.api';
import { JobProfileCard } from './job-profile-card.component';
import styles from './job-profile-search-results.module.css';

const { Text } = Typography;

export interface JobProfileSearchResultsProps {
  data: GetJobProfilesResponse | undefined;
  isLoading: boolean;
}

export const JobProfileSearchResults = ({ data, isLoading }: JobProfileSearchResultsProps) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getBasePath = (path: string) => {
    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  };

  return (
    <div style={{ border: '1px solid #CCC' }}>
      <div style={{ borderBottom: '1px solid #CCC', padding: '1rem' }}>
        <Text style={{ fontSize: '10pt' }}>Showing 1-{0} of 25 results</Text>
      </div>
      <ul className={styles.job_profile_search_results_ul}>
        {isLoading ? (
          <Skeleton loading={isLoading} />
        ) : data?.jobProfiles.length === 0 ? (
          <Empty style={{ margin: '1rem' }} />
        ) : (
          (data?.jobProfiles ?? []).map((d) => (
            <li key={d.id}>
              <Link
                to={`${getBasePath(location.pathname)}/${d.id}${
                  searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
                }`}
              >
                <JobProfileCard data={d} />
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
