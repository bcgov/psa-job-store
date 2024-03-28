/* eslint-disable @typescript-eslint/no-explicit-any */
import { Empty, Pagination, Skeleton, Typography } from 'antd';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
  const isTestEnvironment = import.meta.env.VITE_TEST_ENV === 'true';

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const isPositionRequestRoute = location.pathname.includes('/my-positions/');
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
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (positionRequestId) {
      newSearchParams.set('selectedProfile', profileId.toString());
      return `/my-positions/${positionRequestId}?${newSearchParams.toString()}`;
    } else {
      // If not on the position-request route, use the standard job-profiles path
      return `/job-profiles/${profileId}?${newSearchParams.toString()}`;
    }
  };

  const scrollToTop = () => {
    // todo: this doesn't work, likely because of overflow hidden somewhere
    // console.log('scrolltop!');
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth', // for a smooth scrolling
    // });
  };

  const ReplaceLink = ({ to, children, tabIndex }: any) => {
    const navigate = useNavigate();

    const handleClick = (event: any) => {
      event.preventDefault(); // Prevent default link behavior
      navigate(to, { replace: true }); // Use replace navigation
      scrollToTop();
    };

    return (
      <a href={to} onClick={handleClick} tabIndex={tabIndex}>
        {children}
      </a>
    );
  };

  return (
    <div
      style={{ border: '1px solid #D9D9D9', borderRadius: '8px', background: 'white' }}
      role="region"
      aria-label="job profiles list"
      data-testid="job-profile-search-results"
    >
      <div style={{ borderBottom: '1px solid #F0F0F0', padding: '0rem 1rem' }}>
        <h2 style={{ margin: '16px 0' }}>Job profiles</h2>
      </div>
      <div style={{ borderBottom: '1px solid #F0F0F0', padding: '0.5rem 1rem' }}>
        <Text style={{ fontSize: '14px', display: 'block', padding: '10px 0' }}>
          Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalResults)} of {totalResults}{' '}
          results
        </Text>
      </div>

      {isLoading ? (
        <div data-testid="skeleton-loading">
          <Skeleton loading={isLoading} />
        </div>
      ) : data?.jobProfiles.length === 0 ? (
        <Empty data-testid="empty-state" style={{ margin: '1rem' }} />
      ) : (
        <ul className={styles.job_profile_search_results_ul} data-cy="search-results-list" style={{ padding: '0' }}>
          {(data?.jobProfiles ?? []).map((d) => (
            <li key={d.id} onClick={() => onSelectProfile && onSelectProfile(d)}>
              <ReplaceLink tabIndex={-1} to={getLinkPath(d.id)}>
                <JobProfileCard
                  data={d}
                  link={`${getBasePath(location.pathname)}/${d.id}${
                    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
                  }`}
                />
              </ReplaceLink>
            </li>
          ))}
        </ul>
      )}
      <Pagination
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
