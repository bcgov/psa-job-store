/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Empty, Pagination, Skeleton, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import useAnnounce from '../../../components/app/common/hooks/announce';
import { GetJobProfilesResponse, JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { JobProfileCard } from './job-profile-card.component';
import styles from './job-profile-search-results.module.css';

const { Text } = Typography;

export interface JobProfileSearchResultsProps {
  data: GetJobProfilesResponse | undefined | null;
  isLoading: boolean;
  onSelectProfile?: (profile: JobProfileModel) => void;
  currentPage: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number, pageSize: number) => void;
  isSearchingOrFiltering: boolean;
}

export const JobProfileSearchResults = ({
  data,
  isLoading,
  onSelectProfile,
  currentPage,
  pageSize,
  totalResults,
  onPageChange,
  isSearchingOrFiltering,
}: JobProfileSearchResultsProps) => {
  const isTestEnvironment = false; //import.meta.env.VITE_TEST_ENV === 'true';

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const { positionRequestId } = useParams<{ positionRequestId?: string }>();

  const getLinkPath = (profileNumber: number) => {
    // `${getBasePath(location.pathname)}/${d.id}${
    //   searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
    // }`

    // Check if we're on /job-profiles/saved route
    if (location.pathname.includes('/job-profiles/saved')) {
      return `/job-profiles/saved/${profileNumber}`;
    }

    // Check if we're on the /requests/positions route
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // do not change searchParams directly as other parts of code may use it
    newSearchParams.delete('id');
    newSearchParams.delete('version');
    newSearchParams.delete('selectedProfile');

    if (positionRequestId) {
      newSearchParams.set('selectedProfile', profileNumber.toString());
      return `/requests/positions/${positionRequestId}?${newSearchParams.toString()}`;
    } else {
      // If not on the /requests/positions route, use the standard job-profiles path
      return `/job-profiles/${profileNumber}?${newSearchParams.toString()}`;
    }
  };

  const { announce, announcement } = useAnnounce();
  // console.log('isSearchingOrFiltering, isLoading: ', isSearchingOrFiltering, isLoading);
  useEffect(() => {
    if (isSearchingOrFiltering && !isLoading) {
      // console.log('announce: ', totalResults);
      announce(`${totalResults} results found.`);
    }
  }, [totalResults, announce, isSearchingOrFiltering, isLoading]);

  return (
    <div
      style={{ border: '1px solid #D9D9D9', borderRadius: '8px', background: 'white' }}
      role="region"
      aria-label="job profiles"
      data-testid="job-profile-search-results"
    >
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div style={{ borderBottom: '1px solid #F0F0F0', padding: '0rem 1rem' }}>
        <h2 style={{ margin: '16px 0' }}>Job profiles</h2>
      </div>
      <div style={{ borderBottom: '1px solid #F0F0F0', padding: '0.5rem 1rem' }}>
        <Text style={{ fontSize: '14px', display: 'block', padding: '10px 0' }}>
          {totalResults === 0
            ? '0 results'
            : `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(
                currentPage * pageSize,
                totalResults,
              )} of ${totalResults} results`}
        </Text>
      </div>

      {isLoading ? (
        <div data-testid="skeleton-loading">
          <Skeleton loading={isLoading} active></Skeleton>
        </div>
      ) : data?.jobProfiles.length === 0 ? (
        <Empty data-testid="empty-state" style={{ margin: '1rem' }} description="No profiles found" />
      ) : (
        <ul
          aria-label="list"
          className={styles.job_profile_search_results_ul}
          data-cy="search-results-list"
          style={{ padding: '0' }}
        >
          {(data?.jobProfiles ?? []).map((d) => (
            <li key={d.id} onClick={() => onSelectProfile && onSelectProfile(d)}>
              <Link to={getLinkPath(d.number)} replace tabIndex={-1}>
                <JobProfileCard data={d} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        aria-label="Page navigation"
        prevIcon={<LeftOutlined aria-label="Previous page" />}
        nextIcon={<RightOutlined aria-label="Next page" />}
        showTitle={true}
        data-testid="pagination"
        // have a hidden size changer for testing purposes
        // className="hideSizeChanger"
        showSizeChanger={isTestEnvironment}
        pageSizeOptions={[2, 10]}
        current={currentPage}
        pageSize={pageSize}
        total={totalResults}
        onChange={onPageChange}
        style={{ textAlign: 'center', margin: '1rem' }}
      />
    </div>
  );
};
