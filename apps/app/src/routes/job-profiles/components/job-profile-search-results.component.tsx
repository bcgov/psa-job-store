/* eslint-disable @typescript-eslint/no-explicit-any */
import { Empty, Pagination, Skeleton, Typography } from 'antd';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GetJobProfilesResponse } from '../../../redux/services/graphql-api/job-profile-types';
import { JobProfileCard } from './job-profile-card.component';
import styles from './job-profile-search-results.module.css';

const { Text } = Typography;

export interface JobProfileSearchResultsProps {
  data: GetJobProfilesResponse | undefined;
  isLoading: boolean;
  onSelectProfile?: (id: string) => void;
  currentPage: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number, pageSize: number) => void;
}

export const JobProfileSearchResults = ({
  data,
  isLoading,
  onSelectProfile,
  currentPage,
  pageSize,
  totalResults,
  onPageChange,
}: JobProfileSearchResultsProps) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const isPositionRequestRoute = location.pathname.includes('/position-request/');
  const { positionRequestId } = useParams<{ positionRequestId?: string }>();

  const getBasePath = (path: string) => {
    if (isPositionRequestRoute) return location.pathname.split('/').slice(0, 3).join('/');

    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  };

  const getLinkPath = (profileId: number) => {
    // `${getBasePath(location.pathname)}/${d.id}${
    //   searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
    // }`

    // Check if we're on the position-request route
    if (positionRequestId) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('selectedProfile', profileId.toString());
      return `/position-request/${positionRequestId}?${newSearchParams.toString()}`;
    } else {
      // If not on the position-request route, use the standard job-profiles path
      return `/job-profiles/${profileId}`;
    }
  };

  const ReplaceLink = ({ to, children, tabIndex }: any) => {
    const navigate = useNavigate();

    const handleClick = (event: any) => {
      event.preventDefault(); // Prevent default link behavior
      navigate(to, { replace: true }); // Use replace navigation
    };

    return (
      <a href={to} onClick={handleClick} tabIndex={tabIndex}>
        {children}
      </a>
    );
  };
  return (
    <div
      style={{ border: '1px solid #CCC' }}
      role="region"
      aria-label="job profiles list"
      data-testid="job-profile-search-results"
    >
      <div style={{ borderBottom: '1px solid #CCC', padding: '1rem' }}>
        <h1>
          <Text style={{ fontSize: '10pt' }}>
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalResults)} of{' '}
            {totalResults} results
          </Text>
        </h1>
      </div>
      <ul className={styles.job_profile_search_results_ul} data-cy="search-results-list">
        {isLoading ? (
          <div data-testid="skeleton-loading">
            <Skeleton loading={isLoading} />
          </div>
        ) : data?.jobProfiles.length === 0 ? (
          <Empty data-testid="empty-state" style={{ margin: '1rem' }} />
        ) : (
          (data?.jobProfiles ?? []).map((d) => (
            <li key={d.id} onClick={() => onSelectProfile && onSelectProfile(d.id.toString())}>
              <ReplaceLink tabIndex={-1} to={getLinkPath(d.id)}>
                <JobProfileCard
                  data={d}
                  link={`${getBasePath(location.pathname)}/${d.id}${
                    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
                  }`}
                />
              </ReplaceLink>
            </li>
          ))
        )}
      </ul>
      <Pagination
        data-testid="pagination"
        showSizeChanger
        current={currentPage}
        pageSize={pageSize}
        pageSizeOptions={[1, 2, 3, 5, 10]}
        total={totalResults}
        onChange={onPageChange}
        style={{ textAlign: 'center', margin: '1rem' }}
      />
    </div>
  );
};
