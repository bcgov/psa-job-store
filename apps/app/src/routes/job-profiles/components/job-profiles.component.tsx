/* eslint-disable @typescript-eslint/no-explicit-any */
// JobProfilesContent.jsx
import { FileTextFilled } from '@ant-design/icons';
import { Breakpoint, Col, Empty, Grid, Row, Space, Typography } from 'antd';
import { MutableRefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/redux.store';
import { graphqlApi } from '../../../redux/services/graphql-api';
import { GetJobProfilesResponse, JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { OrganizationModel } from '../../../redux/services/graphql-api/organization';
import { GetPositionRequestResponseContent } from '../../../redux/services/graphql-api/position-request.api';
import { useLazyGetPositionProfileQuery } from '../../../redux/services/graphql-api/position.api';
import { JobProfileSearchResults } from './job-profile-search-results.component';
import { JobProfileSearch } from './job-profile-search.component';
import JobProfileViewCounter from './job-profile-view-counter.component';
import { JobProfile } from './job-profile.component';
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface JobProfilesContentProps {
  searchParams: URLSearchParams;
  // searchQuery: string | null;
  onSelectProfile?: (profile: JobProfileModel) => void;
  // onUseProfile?: () => void;
  page_size?: number;
  selectProfileNumber?: string | null;
  previousSearchState?: MutableRefObject<string>;
  organizationFilterExtra?: OrganizationModel;
  positionRequestId?: number;
  loadProfileIds?: number[];
  prData?: GetPositionRequestResponseContent | null;
}

interface JobProfilesRef {
  handlePageChange: (page: number) => void;
}

const JobProfiles = forwardRef<JobProfilesRef, JobProfilesContentProps>(
  (
    {
      searchParams,
      onSelectProfile,
      selectProfileNumber,
      previousSearchState,
      organizationFilterExtra,
      loadProfileIds,
      prData,
      page_size = 10,
    },
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const [useData, setUseData] = useState<GetJobProfilesResponse | null>(null);
    const [trigger, { data, isLoading, isFetching }] = useLazyGetJobProfilesQuery();

    const [classificationIdFilter, setClassificationIdFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(page_size); // Default page size, adjust as needed
    const [totalResults, setTotalResults] = useState(0); // Total results count from API
    const [isSearchingOrFiltering, setIsSearchingOrFiltering] = useState(false);
    const [isLoadingCalcualted, setIsLoadingCalculated] = useState(false);

    const navigate = useNavigate();
    const { positionRequestId, number } = useParams();
    const params = useParams();
    const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();

    // useref to keep track of whether we fetched with selectProfileId
    const selectProfileIdRan = useRef(false);

    /*
    AL-85 Code
    // Get Position Request
    //  - Get Reporting To Position ID
    // Get Classification for Position
    //  - Use classification_id and filter jobProfilesQuery
  */

    // todo: this should not be needed, get this info from the wizard context
    // const [prTrigger, { data: prData }] = useLazyGetPositionRequestQuery();
    const [pTrigger, { data: pData }] = useLazyGetPositionProfileQuery();
    const [positionFilteringProcessActive, setPositionFilteringProcessActive] = useState<boolean>(true);
    // TODO: Add useLazyGetPositionQuery(<id>)

    useEffect(() => {
      // If we have a positionRequestId and no position request data, get the position request data
      // if (positionRequestId != null && prData == null) {
      //   // console.log('prTrigger!');
      //   prTrigger({ id: +positionRequestId });
      // }

      if (positionRequestId == null) {
        setPositionFilteringProcessActive(false);
      }

      // If we have a positionRequestId and prData, get the position data
      const reportsToPositionId = prData?.reports_to_position_id;

      // only need to fetch if reports_to_position is not recorded - for backwards compatibility.
      if (reportsToPositionId != null && pData == null && prData?.reports_to_position == null) {
        dispatch(graphqlApi.util.invalidateTags(['jobProfiles']));
        pTrigger({ positionNumber: `${reportsToPositionId}`, extraInfo: true });
      }

      // If we have a positionRequestId, position request data, and position data, get the classification ID for the position
      const { classificationId, classificationEmployeeGroupId, classificationPeoplesoftId } =
        prData?.reports_to_position ?? pData?.positionProfile[0] ?? {};
      // const classificationId = pData?.position?.classification_id;
      const classification =
        classificationId != null
          ? `${classificationId}.${classificationEmployeeGroupId}.${classificationPeoplesoftId}`
          : null;

      if (classification != null && classificationIdFilter == null) {
        setPositionFilteringProcessActive(false);
        // set classificationIdFilter from the position data to filter job profiles by classification
        setClassificationIdFilter(classification);
      }
    }, [positionRequestId, prData, pData, classificationIdFilter, dispatch, pTrigger]);

    const [initialFetchDone, setInitialFetchDone] = useState(false);

    const getBasePath = useCallback(
      (path: string) => {
        if (positionRequestId) return `/requests/positions/${positionRequestId}`;

        const pathParts = path.split('/');
        // Check if the last part is a number (ID), if so, remove it
        if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
          pathParts.pop(); // Remove the last part (job profile ID)
        }
        return pathParts.join('/');
      },
      [positionRequestId],
    );

    useEffect(() => {
      // Use the following for the `search` property.
      // Search terms need to be joined with specific syntax, <-> in this case
      // const search = searchParams.get('search')?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');
      const search = searchParams.get('search');
      const organizationFilter = searchParams.get('ministry_id__in');
      const jobRoleFilter = searchParams.get('job_role_type_id__in');
      const classificationFilter = searchParams.get('classification_id__in');
      const jobFamilyFilter = searchParams.get('job_family_id__in');
      const jobStreamFilter = searchParams.get('job_stream_id__in');

      // if it's a change in selectedProfile then do not refetch, just return

      setCurrentPage(parseInt(searchParams.get('page') ?? '1'));

      if (positionFilteringProcessActive) {
        return;
      }

      // this prevents fetching of job profiles when user selects a different profile
      if ((searchParams.get('selectedProfile') || number != null) && initialFetchDone && !searchParams.get('fetch')) {
        return;
      }

      // console.log('setUseData to null');
      setUseData(null);
      setInitialFetchDone(true);

      const filtersOrSearchApplied =
        organizationFilter || jobRoleFilter || classificationFilter || jobFamilyFilter || jobStreamFilter || search;

      // console.log('filtersOrSearchApplied: ', filtersOrSearchApplied != null);
      setIsSearchingOrFiltering(filtersOrSearchApplied != null);
      if (filtersOrSearchApplied != null) {
        setIsLoadingCalculated(true);
      }
      // use reloaded the page while having fitlers or search applied
      // however we need to select the profile that was originally selected for this position request
      // (for case where user pressed "back" from edit page)
      // - clear filters and search, this will trigger re-run of this function with no filters or search
      if (!selectProfileIdRan.current && filtersOrSearchApplied && selectProfileNumber) {
        const basePath = getBasePath(location.pathname);
        const searchParams = new URLSearchParams();
        if (searchParams.get('search')) searchParams.delete('search');
        searchParams.set('clearFilters', 'true');
        navigate(
          {
            pathname: basePath,
            search: searchParams.toString(),
          },
          { replace: true },
        );
        return;
      }

      // if we are doing organization filtering because user is creating a new position request
      // in that organization, apply this filter in addition to user applied organization filter
      //
      // if no user filters applied, we need to return all profiles for this organization AND profiles for all orgs
      // if user did apply filters, then apply those filters only
      let applyOrgFilter = '';
      if (!organizationFilter && organizationFilterExtra) {
        applyOrgFilter = organizationFilterExtra.id + ',ALL';
      } else if (organizationFilter) {
        applyOrgFilter = organizationFilter;
      }

      // if (loadProfileIds) {
      //   // If loadProfileIds is provided, fetch only those job profiles
      //   trigger({
      //     where: {
      //       id: {
      //         in: loadProfileIds,
      //       },
      //     },
      //     skip: (currentPage - 1) * pageSize,
      //     take: pageSize,
      //   });
      // } else {

      trigger({
        ...(search != null && { search }),
        where: {
          AND: [
            ...(loadProfileIds
              ? [
                  {
                    id: {
                      in: loadProfileIds,
                    },
                  },
                ]
              : []),
            ...(classificationIdFilter != null
              ? [
                  {
                    OR: [
                      {
                        all_reports_to: {
                          equals: true,
                        },
                      },
                      {
                        reports_to: {
                          some: {
                            OR: classificationIdFilter?.split(',').flatMap((c) => {
                              const [id, employee_group_id, peoplesoft_id] = c.split('.');
                              return {
                                classification_id: { equals: id },
                                classification_employee_group_id: { equals: employee_group_id },
                                classification_peoplesoft_id: { equals: peoplesoft_id },
                              };
                            }),
                          },
                        },
                      },
                    ],
                  },
                ]
              : []),
            ...(applyOrgFilter != ''
              ? [
                  {
                    organizations: {
                      some: {
                        organization_id: {
                          in: JSON.parse(`[${applyOrgFilter.split(',').map((v) => `"${v}"`)}]`),
                        },
                      },
                    },
                  },
                ]
              : []),
            ...(classificationFilter != null
              ? [
                  {
                    classifications: {
                      some: {
                        OR: classificationFilter?.split(',').flatMap((c) => {
                          const [id, employee_group_id, peoplesoft_id] = c.split('.');
                          return {
                            classification_id: { equals: id },
                            classification_employee_group_id: { equals: employee_group_id },
                            classification_peoplesoft_id: { equals: peoplesoft_id },
                          };
                        }),
                      },
                    },
                  },
                ]
              : []),
            ...(jobFamilyFilter !== null
              ? [
                  {
                    jobFamilies: { some: { jobFamilyId: { in: JSON.parse(`[${jobFamilyFilter}]`) } } },
                  },
                ]
              : []),
            ...(jobRoleFilter !== null
              ? [
                  {
                    role_type_id: {
                      in: JSON.parse(`[${jobRoleFilter}]`),
                    },
                  },
                ]
              : []),
            ...(jobStreamFilter !== null
              ? [
                  {
                    streams: { some: { streamId: { in: JSON.parse(`[${jobStreamFilter}]`) } } },
                  },
                ]
              : []),
          ],
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        // if we need to have a specific profile selected, the server will ignore take and skip to get correct frame
        // it will also ignore filters and search query
        selectProfile: !selectProfileIdRan.current ? selectProfileNumber : null,
      });

      // Fetch job profiles based on other filters and search query
      // }
    }, [
      searchParams,
      trigger,
      currentPage,
      pageSize,
      classificationIdFilter,
      positionFilteringProcessActive,
      initialFetchDone,
      selectProfileNumber,
      getBasePath,
      navigate,
      organizationFilterExtra,
      loadProfileIds,
      number,
    ]);

    // Update totalResults based on the response (if applicable)
    useEffect(() => {
      if (useData && useData.jobProfilesCount !== undefined) {
        // console.log('updating count..: ', useData.jobProfilesCount);
        setTotalResults(useData.jobProfilesCount);
      }
      // if search params has selected profile, ensure we call back to parent
      if (searchParams.get('selectedProfile')) {
        const profileNumber = searchParams.get('selectedProfile');
        if (profileNumber) {
          const jobProfile = useData?.jobProfiles.find((p: any) => p.number === parseInt(profileNumber));
          if (jobProfile) onSelectProfile?.(jobProfile);
        }
      }
    }, [useData, onSelectProfile, searchParams]);

    useImperativeHandle(ref, () => ({
      handlePageChange: (page: number) => {
        setCurrentPage(page);
      },
    }));

    useEffect(() => {
      if (data && !isFetching && !isLoading) {
        // console.log('setting useData: ', data.jobProfilesCount);
        setUseData({
          jobProfiles: data.jobProfiles,
          jobProfilesCount: data.jobProfilesCount,
          pageNumberForSelectProfile: data.pageNumberForSelectProfile,
        });

        // 2024-04-08 new - if pageNumberForSelectProfile is present, set the page to that
        if (data.pageNumberForSelectProfile != -1) {
          const newPage = data.pageNumberForSelectProfile;
          setCurrentPage(newPage);
          searchParams.set('page', newPage.toString());
          // if we are on /job-profiles route, don't set "selectedProfile"
          // if (!location.pathname.startsWith('/job-profiles')) {
          searchParams.set('selectedProfile', selectProfileNumber ?? '');
          // }

          const basePath = location.pathname.startsWith('/job-profiles')
            ? location.pathname
            : getBasePath(location.pathname);

          navigate({
            pathname: basePath,
            search: searchParams.toString(),
          });

          // memorize the search state used to display previously selected profile
          if (previousSearchState) previousSearchState.current = searchParams.toString();
        }

        selectProfileIdRan.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isFetching, isLoading]);

    // const getBasePath = (path: string) => {
    //   const pathParts = path.split('/');
    //   // Check if the last part is a number (ID), if so, remove it
    //   if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
    //     pathParts.pop(); // Remove the last part (job profile ID)
    //   }
    //   return pathParts.join('/');
    // };

    const handlePageChange = (page: number, pageSize: number) => {
      setCurrentPage(page);
      searchParams.set('page', page.toString());
      searchParams.delete('selectedProfile');

      // Optionally, update the page size as well
      setPageSize(pageSize);

      const basePath = getBasePath(location.pathname);

      navigate(
        {
          pathname: basePath,
          search: searchParams.toString(),
        },
        { replace: true },
      );
    };

    const renderJobProfile = () => {
      return params.number || searchParams.get('selectedProfile') ? (
        <JobProfile />
      ) : (
        <div style={{ marginTop: '16rem' }} data-testid="job-profile-empty">
          <Empty
            description={
              <Space direction="vertical" style={{ userSelect: 'none' }}>
                <Title style={{ margin: 0 }} level={1}>
                  Select a job profile
                </Title>
                <Text>Choose a profile from the sidebar on the left.</Text>
              </Space>
            }
            image={<FileTextFilled aria-hidden style={{ fontSize: '60pt', color: '#0057ad' }} />}
          />
        </div>
      );
    };

    // ministry filter should only contain the ministry in which the position is being created in
    const ministriesData = organizationFilterExtra && [
      { id: organizationFilterExtra.id, name: organizationFilterExtra.name },
    ];

    useEffect(() => {
      if (useData == null || positionFilteringProcessActive || isLoading || isFetching) setIsLoadingCalculated(true);
      else setIsLoadingCalculated(false);
    }, [useData, positionFilteringProcessActive, isLoading, isFetching]);

    return (
      <>
        <JobProfileSearch
          fullWidth={true}
          positionRequestId={positionRequestId ? parseInt(positionRequestId) : undefined}
          ministriesData={ministriesData}
        />
        <Row justify="center" gutter={16}>
          {screens['xl'] === true ? (
            <>
              <Col span={8}>
                <JobProfileViewCounter onProfileView={onSelectProfile}>
                  <JobProfileSearchResults
                    data={useData}
                    //  jobProfilesLoading || isLoading
                    isLoading={isLoadingCalcualted}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalResults={totalResults}
                    onPageChange={handlePageChange}
                    isSearchingOrFiltering={isSearchingOrFiltering}
                  />
                </JobProfileViewCounter>
              </Col>
              <Col span={16} role="region" aria-label="Selected job profile contents">
                {renderJobProfile()}
              </Col>
            </>
          ) : params.number ? (
            <Col span={24} role="region" aria-label="Selected job profile contents">
              {renderJobProfile()}
            </Col>
          ) : (
            <JobProfileViewCounter onProfileView={onSelectProfile}>
              <JobProfileSearchResults
                data={useData}
                isLoading={isLoading}
                currentPage={currentPage}
                pageSize={pageSize}
                totalResults={totalResults}
                onPageChange={handlePageChange}
                isSearchingOrFiltering={isSearchingOrFiltering}
              />
            </JobProfileViewCounter>
          )}
        </Row>
      </>
    );
  },
);

export default JobProfiles;
