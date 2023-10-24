/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { GetJobProfilesResponse } from '../../../redux/services/graphql-api/job-profile.api';
import { JobProfileCard } from './job-profile-card.component';
import styles from './job-profile-search-results.module.css';

const { Text } = Typography;

export interface JobProfileSearchResultsProps {
  data: GetJobProfilesResponse | undefined;
}

export const JobProfileSearchResults = (props: JobProfileSearchResultsProps) => {
  return (
    <div style={{ border: '1px solid #CCC' }}>
      <div style={{ borderBottom: '1px solid #CCC', padding: '1rem' }}>
        <Text style={{ fontSize: '10pt' }}>Showing 1-{0} of 25 results</Text>
      </div>
      <ul className={styles.job_profile_search_results_ul}>
        {(props.data?.jobProfiles ?? []).map((d) => (
          <li>
            <Link to={`/job-profiles/${d.id}`}>
              <JobProfileCard data={d} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
