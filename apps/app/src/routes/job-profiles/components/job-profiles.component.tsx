/* eslint-disable @typescript-eslint/no-explicit-any */
// JobProfilesContent.jsx
import { ExclamationCircleFilled, FileTextFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Alert, Col, Empty, Pagination, Row, Skeleton, Space, Tabs, Typography } from 'antd';
import { MutableRefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useAnnounce from '../../../components/app/common/hooks/announce';
import { useWindowWidth } from '../../../components/app/common/hooks/use-window-width';
import { useAppDispatch } from '../../../redux/redux.store';
import { graphqlApi } from '../../../redux/services/graphql-api';
import { GetJobProfilesResponse, JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { OrganizationModel } from '../../../redux/services/graphql-api/organization';
import { GetPositionRequestResponseContent } from '../../../redux/services/graphql-api/position-request.api';
import { useLazyGetPositionProfileQuery } from '../../../redux/services/graphql-api/position.api';
import { useGetSavedJobProfileIdsQuery } from '../../../redux/services/graphql-api/saved-job-profile.api';
import { JobProfileCard } from './job-profile-card.component';
import styles from './job-profile-search-results.module.css';
import { JobProfileSearch } from './job-profile-search.component';
import JobProfileViewCounter from './job-profile-view-counter.component';
import { JobProfile } from './job-profile.component';
import './job-profile.component.css';
import { useJobProfilesProvider } from './job-profiles.context';
const { Text, Title } = Typography;

interface JobProfilesContentProps {
  // searchQuery: string | null;
  onSelectProfile?: (profile: JobProfileModel) => void;
  // onUseProfile?: () => void;
  page_size?: number;
  selectProfileNumber?: string | null;
  previousSearchState?: MutableRefObject<string>;
  organizationFilterExtra?: OrganizationModel;
  positionRequestId?: number;
  prData?: GetPositionRequestResponseContent | null;
  showVersions?: boolean;
}

interface JobProfilesRef {
  handlePageChange: (page: number) => void;
}

const JobProfiles = forwardRef<JobProfilesRef, JobProfilesContentProps>(
  (
    {
      onSelectProfile,
      selectProfileNumber,
      previousSearchState,
      organizationFilterExtra,
      prData,
      page_size = 10,
      showVersions = false,
    },
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const [useData, setUseData] = useState<GetJobProfilesResponse | null>(null);
    const [trigger, { data, isLoading, isFetching, isError, error }] = useLazyGetJobProfilesQuery();

    const [searchParams, setSearchParams] = useSearchParams();
    const [classificationIdFilter, setClassificationIdFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(page_size); // Default page size, adjust as needed
    const [totalResults, setTotalResults] = useState(0); // Total results count from API
    const [origTotalResults, setOrigTotalResults] = useState(-1); // Total results count from API
    const [origTotalSavedResults, setOrigTotalSavedResults] = useState(-1); // Total results count from API
    const [isSearchingOrFiltering, setIsSearchingOrFiltering] = useState(false);
    const [isLoadingCalcualted, setIsLoadingCalculated] = useState(false);
    const [tabSwitchedLoading, setTabSwitchedLoading] = useState(false);
    // ref for storing searchparams for last request
    const lastSearchParams = useRef<string | null>(null);
    const {
      setShouldFetch,
      shouldFetch,
      clearingFilters,
      setClearingFilters,
      setClearingSearch,
      setReselectOriginalWizardProfile,
      reselectOriginalWizardProfile,
    } = useJobProfilesProvider();
    const { positionRequestId, number } = useParams();
    // console.log('number: ', number);

    const params = useParams();

    const {
      data: savedJobProfileIds,
      // isLoading: isSavedJobProfileIdsLoading,
      refetch: refetchSaved,
    } = useGetSavedJobProfileIdsQuery();
    const [activeTab, setActiveTab] = useState('1');
    const [loadProfileIds, setLoadProfileIds] = useState<number[] | null>(null);
    const location = useLocation();

    useEffect(() => {
      refetchSaved();
    }, [refetchSaved]);

    // console.log('savedJobProfileIds: ', savedJobProfileIds);
    useEffect(() => {
      if (savedJobProfileIds) {
        if (activeTab === '2') {
          setLoadProfileIds(savedJobProfileIds.getSavedJobProfileIds);
          // setSearchParams(new URLSearchParams({ fetch: 'true' }));
          // searchParams.set('fetch', 'true');
          // console.log('setSearchParams to empty A');
          setSearchParams(new URLSearchParams({}));
          setShouldFetch(true);
        }

        if (origTotalSavedResults === -1) setOrigTotalSavedResults(savedJobProfileIds.getSavedJobProfileIds.length);
      }

      // if (activeTab === '1') {
      //   console.log('active tab is 1, setting loadProfileIds to null');
      //   setLoadProfileIds(null);

      //   // setSearchParams(new URLSearchParams({ fetch: 'true' }));
      //   console.log('shouldFetch true now');
      //   setShouldFetch(true);
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedJobProfileIds]);

    const prevActiveTabRef = useRef(activeTab);
    useEffect(() => {
      if (prevActiveTabRef.current == activeTab) {
        prevActiveTabRef.current = activeTab;
        return;
      }
      prevActiveTabRef.current = activeTab;

      if (activeTab === '1') {
        setLoadProfileIds(null);
        // console.log('setSearchParams to empty B');
        setSearchParams(new URLSearchParams({}));
        // console.log('setting clearing filters 2');
        setClearingFilters(true);
        setClearingSearch(true);
        setShouldFetch(true);
      } else if (activeTab === '2') {
        // console.log('setSearchParams to empty C');
        setSearchParams(new URLSearchParams({}));
        setLoadProfileIds(savedJobProfileIds?.getSavedJobProfileIds ?? []);
        // console.log('setting clearing filters 3');
        setClearingFilters(true);
        setClearingSearch(true);
        setShouldFetch(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    // console.log('searchParams: ', searchParams.toString());

    const navigate = useNavigate();

    // useref to keep track of whether we fetched with selectProfileId
    const selectProfileIdRan = useRef(false);

    // useref to keep track of the profile number that ran with the pageNumberForSelectProfile query
    const selectProfileForPageNumber = useRef('');

    useEffect(() => {
      if (isError) {
        console.log(error);
        navigate('/not-found');
      }
    }, [isError, error, navigate]);
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

    // const prevClearingFilters = useRef(clearingFilters);
    // const prevShouldFetch = useRef(shouldFetch);
    // const prevSearchParams = useRef(searchParams);
    // const prevTrigger = useRef(trigger);
    // const prevCurrentPage = useRef(currentPage);
    // const prevPageSize = useRef(pageSize);
    // const prevClassificationIdFilter = useRef(classificationIdFilter);
    // const prevPositionFilteringProcessActive = useRef(positionFilteringProcessActive);
    // const prevInitialFetchDone = useRef(initialFetchDone);
    // const prevSelectProfileNumber = useRef(selectProfileNumber);
    // const prevOrganizationFilterExtra = useRef(organizationFilterExtra);
    // const prevLoadProfileIds = useRef(loadProfileIds);
    // const prevNumber = useRef(number);
    // const prevDepartmentId = useRef(prData?.department_id);
    // const prevPositionRequestId = useRef(positionRequestId);
    // const prevSetShouldFetch = useRef(setShouldFetch);
    // const prevGetBasePath = useRef(getBasePath);
    // const prevNavigate = useRef(navigate);
    // const prevSetClearingFilters = useRef(setClearingFilters);

    useEffect(() => {
      // console.log('fetch hook');
      // if (skipFetch) {
      //   console.log('skip fetch, returning..');
      //   setSkipFetch(false);
      //   lastSearchParams.current = searchParams.toString();
      //   return;
      // }

      if (lastSearchParams.current == searchParams.toString() && !shouldFetch) {
        // console.log('params didnt change, returning..', searchParams.toString());
        return;
      } else {
        // console.log('params changed, continuing..', searchParams.toString(), lastSearchParams.current);
      }

      // Use the following for the `search` property.
      // Search terms need to be joined with specific syntax, <-> in this case
      // const search = searchParams.get('search')?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');
      const search = searchParams.get('search');
      // console.log('searchParams search: ', search);

      const organizationFilter = searchParams.get('ministry_id__in');
      const jobRoleFilter = searchParams.get('job_role_type_id__in');
      const classificationFilter = searchParams.get('classification_id__in');
      const jobFamilyFilter = searchParams.get('job_family_id__in');
      const jobStreamFilter = searchParams.get('job_stream_id__in');
      // const clearingFilters = searchParams.get('clearFilters') != null;

      // if it's a change in selectedProfile then do not refetch, just return

      // console.log('setting current page: ', searchParams.get('page'));
      setCurrentPage(parseInt(searchParams.get('page') ?? '1'));
      const useCurrentPage = parseInt(searchParams.get('page') ?? '1');
      // console.log('current page: ', currentPage);

      if (positionFilteringProcessActive) {
        // console.log('returning A');
        return;
      }

      // console.log('CURRENT searchParams: ', searchParams.toString());

      // console.log('shouldFetch: ', shouldFetch);
      // this prevents fetching of job profiles when user selects a different profile
      if ((searchParams.get('selectedProfile') || number != null) && initialFetchDone && !shouldFetch) {
        // if we're clearing filters, then we need to fetch again
        if (!clearingFilters) {
          // console.log('returning B');
          lastSearchParams.current = searchParams.toString();
          return;
        }
      }
      setShouldFetch(false);
      // searchParams.delete('fetch');

      // console.log('setUseData to null');
      setUseData(null);
      setInitialFetchDone(true);

      const filtersOrSearchApplied =
        organizationFilter || jobRoleFilter || classificationFilter || jobFamilyFilter || jobStreamFilter || search;

      // console.log('filtersOrSearchApplied: ', filtersOrSearchApplied != null);
      setIsSearchingOrFiltering(filtersOrSearchApplied != null);
      if (filtersOrSearchApplied != null) {
        // console.log('setting isLoadingCalculated to true A');
        setIsLoadingCalculated(true);
      }
      // use reloaded the page while having fitlers or search applied
      // however we need to select the profile that was originally selected for this position request
      // (for case where user pressed "back" from edit page, selects filters, selects a different profile and then reloads)
      // - clear filters and search, this will trigger re-run of this function with no filters or search
      if (!selectProfileIdRan.current && filtersOrSearchApplied && selectProfileNumber) {
        // do this only if user is on the wizard page, e.g. /requests/positions/707
        // otherwise reloading on explore page with filters clears them
        if (positionRequestId) {
          // console.log('clearing A ');
          const basePath = getBasePath(location.pathname);
          const searchParams = new URLSearchParams();
          if (searchParams.get('search')) {
            // console.log('deleting search');
            searchParams.delete('search');
          }
          // searchParams.set('clearFilters', 'true');
          // console.log('setting clearing filters 4');
          setClearingFilters(true);
          // console.log('navigate to C: ', searchParams.toString());

          navigate(
            {
              pathname: basePath,
              search: searchParams.toString(),
            },
            { replace: true },
          );
          // console.log('returning C');
          // lastSearchParams.current = searchParams.toString();
          return;
        }
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

      // if user is clearing filters, and is on position request page,
      // then ensure we select the profile that is currently selected
      // instead of selecting the profile associated with the position request

      let toSelectProfileNumber = selectProfileNumber;

      if (clearingFilters && positionRequestId && !reselectOriginalWizardProfile) {
        toSelectProfileNumber = searchParams.get('selectedProfile') ?? selectProfileNumber;
      } else if (reselectOriginalWizardProfile) {
        setReselectOriginalWizardProfile(false);
      }

      selectProfileForPageNumber.current = toSelectProfileNumber ?? '';

      // console.log('TRIGGER, search: ', search);
      // console.log('search params are: ', searchParams.toString());
      lastSearchParams.current = searchParams.toString();
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
        skip: (useCurrentPage - 1) * pageSize,
        take: pageSize,
        // if we need to have a specific profile selected, the server will ignore take and skip to get correct frame
        // it will also ignore filters and search query
        selectProfile: !selectProfileIdRan.current || clearingFilters ? toSelectProfileNumber : null,
        //pass departmentid to only return included/excluded profiles
        departmentId: prData?.department_id,
      });

      // Fetch job profiles based on other filters and search query
      // }

      // Update all refs with current values
      // prevClearingFilters.current = clearingFilters;
      // prevShouldFetch.current = shouldFetch;
      // prevSearchParams.current = searchParams;
      // prevTrigger.current = trigger;
      // prevCurrentPage.current = currentPage;
      // prevPageSize.current = pageSize;
      // prevClassificationIdFilter.current = classificationIdFilter;
      // prevPositionFilteringProcessActive.current = positionFilteringProcessActive;
      // prevInitialFetchDone.current = initialFetchDone;
      // prevSelectProfileNumber.current = selectProfileNumber;
      // prevOrganizationFilterExtra.current = organizationFilterExtra;
      // prevLoadProfileIds.current = loadProfileIds;
      // prevNumber.current = number;
      // prevDepartmentId.current = prData?.department_id;
      // prevPositionRequestId.current = positionRequestId;
      // prevSetShouldFetch.current = setShouldFetch;
      // prevGetBasePath.current = getBasePath;
      // prevNavigate.current = navigate;
      // prevSetClearingFilters.current = setClearingFilters;
    }, [
      clearingFilters,
      shouldFetch,
      setShouldFetch,
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
      prData?.department_id,
      positionRequestId,
      setClearingFilters,
    ]);

    // Update totalResults based on the response (if applicable)
    useEffect(() => {
      if (useData && useData.jobProfilesCount !== undefined) {
        // console.log('updating count..: ', useData.jobProfilesCount);
        setTotalResults(useData.jobProfilesCount);
        if (origTotalResults === -1) setOrigTotalResults(useData.jobProfilesCount);
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
      // console.log('set? ', !data, isFetching, isLoading);
      if (data && !isFetching && !isLoading) {
        // console.log('setting useData: ', data);
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
          searchParams.set('selectedProfile', selectProfileForPageNumber.current ?? '');
          // }

          const basePath = location.pathname.startsWith('/job-profiles')
            ? location.pathname
            : getBasePath(location.pathname);

          // console.log('NAVIGATING TO A: ', searchParams.toString());
          navigate({
            pathname: basePath,
            search: searchParams.toString(),
          });

          // memorize the search state used to display previously selected profile
          if (previousSearchState) previousSearchState.current = searchParams.toString();
        } else {
          // if it's not present and we are on /job-profiles/saved, it could mean user linked to a profile that is not in the
          // other's users list. In this case, redirect to /job-profiles/:number
          if (location.pathname.startsWith('/job-profiles/saved') && selectProfileNumber) {
            // console.log('navigate to B: ', selectProfileNumber);
            navigate(`/job-profiles/${selectProfileNumber}`);
          }
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

      // console.log('navigate to BB: ', searchParams.toString());
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
        <JobProfile showVersions={showVersions} />
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
      // console.log('flags: ', useData == null, positionFilteringProcessActive, isLoading, isFetching);
      if (useData == null || positionFilteringProcessActive || isLoading || isFetching) {
        // console.log('setting isLoadingCalculated to true B');
        setIsLoadingCalculated(true);
      } else {
        // console.log('setting isLoadingCalculated to false');
        setIsLoadingCalculated(false);
        setTabSwitchedLoading(false);
      }
    }, [useData, positionFilteringProcessActive, isLoading, isFetching]);

    const getLinkPath = (profileNumber: number) => {
      // `${getBasePath(location.pathname)}/${d.id}${
      //   searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
      // }`

      const routePrefix = location.pathname.includes('/job-profiles/saved') ? '/job-profiles/saved' : '/job-profiles';

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
        return `${routePrefix}/${profileNumber}?${newSearchParams.toString()}`;
      }
    };

    const { announce, announcement } = useAnnounce();
    // console.log('isSearchingOrFiltering, isLoading: ', isSearchingOrFiltering, isLoading);
    useEffect(() => {
      if (isSearchingOrFiltering && !isLoadingCalcualted) {
        // console.log('announce: ', totalResults);
        announce(`${totalResults} results found.`);
      }
    }, [totalResults, announce, isSearchingOrFiltering, isLoadingCalcualted]);

    // console.log('isLoadingCalcualted, tabSwitchedLoading: ', isLoadingCalcualted, tabSwitchedLoading);
    const renderSearchResults = (onSelectProfileF: any) => {
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

          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              setTabSwitchedLoading(true);
            }}
            items={[
              {
                key: '1',
                label: `All (${origTotalResults == -1 ? 0 : origTotalResults})`,
                children:
                  isLoadingCalcualted || tabSwitchedLoading ? (
                    <div data-testid="skeleton-loading" style={{ height: '669px' }}>
                      <Skeleton loading={isLoadingCalcualted} active />
                    </div>
                  ) : data?.jobProfiles.length === 0 ? (
                    <Empty data-testid="empty-state" style={{ margin: '1rem' }} description="No profiles found" />
                  ) : (
                    renderProfileList(onSelectProfileF, data?.jobProfiles ?? [])
                  ),
              },
              {
                key: '2',
                label: `Saved (${savedJobProfileIds?.getSavedJobProfileIds.length ?? 0})`,
                children:
                  isLoadingCalcualted || tabSwitchedLoading ? (
                    <div data-testid="skeleton-loading" style={{ height: '669px' }}>
                      <Skeleton loading={isLoadingCalcualted} active />
                    </div>
                  ) : data?.jobProfiles.length === 0 ? (
                    <Empty data-testid="empty-state" style={{ margin: '1rem' }} description="No profiles found" />
                  ) : (
                    <>
                      {/* {positionRequestId ? (
                        <Alert
                          style={{ borderRadius: '0', marginBottom: '0' }}
                          message={'The items in this list might have been filtered out by the system'}
                          type="warning"
                          role="note"
                          showIcon
                        />
                      ) : (
                        ''
                      )} */}
                      {renderProfileList(onSelectProfileF, data?.jobProfiles ?? [])}
                    </>
                  ),
              },
            ]}
            tabBarStyle={{ backgroundColor: '#fff', paddingLeft: '1rem', paddingRight: '1rem', margin: 0 }}
          />
        </div>
      );
    };

    const renderProfileList = (onSelectProfileF: any, profiles: any[]) => (
      <>
        {isSearchingOrFiltering && !isLoading && (
          <Alert
            role="info"
            data-testid="verification-warning-message"
            message=""
            description={<span>Some profiles may be hidden based on the details you have already provided.</span>}
            type="warning"
            showIcon
            icon={<ExclamationCircleFilled style={{ alignSelf: 'center' }} />}
            style={{ padding: '10px', borderRadius: 0 }}
          />
        )}
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

        <ul
          aria-label="list"
          className={styles.job_profile_search_results_ul}
          data-cy="search-results-list"
          style={{ padding: '0' }}
        >
          {profiles.map((d) => (
            <li key={d.id} onClick={() => onSelectProfileF && onSelectProfileF(d)}>
              <Link to={getLinkPath(d.number)} replace tabIndex={-1}>
                <JobProfileCard
                  data={d}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onSavedCallback={(_isSaved: boolean, _data: any) => {
                    refetchSaved();
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>

        <Pagination
          aria-label="Page navigation"
          prevIcon={<LeftOutlined aria-label="Previous page" />}
          nextIcon={<RightOutlined aria-label="Next page" />}
          showTitle={true}
          data-testid="pagination"
          current={currentPage}
          pageSize={pageSize}
          total={totalResults}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ textAlign: 'center', margin: '1rem' }}
          showLessItems={isMobile}
        />
      </>
    );

    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 1545;

    return (
      <>
        <JobProfileSearch
          fullWidth={true}
          positionRequestId={positionRequestId ? parseInt(positionRequestId) : undefined}
          ministriesData={ministriesData}
        />
        <Row justify="center" gutter={16}>
          {/* {screens['xl'] === true ? ( */}
          <>
            <Col span={8}>
              <JobProfileViewCounter onProfileView={onSelectProfile} renderSearchResults={renderSearchResults} />
            </Col>
            <Col span={16} role="region" aria-label="Selected job profile contents">
              {renderJobProfile()}
            </Col>
          </>
          {/* ) : params.number ? (
            <Col span={24} role="region" aria-label="Selected job profile contents">
              {renderJobProfile()}
            </Col>
          )  */}
          {/* {!params.number ? (
            <>
              <JobProfileViewCounter onProfileView={onSelectProfile} renderSearchResults={renderSearchResults} />
            </>
          ) : (
            <></>
          )} */}
        </Row>
      </>
    );
  },
);

export default JobProfiles;
