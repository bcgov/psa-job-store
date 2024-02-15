// JobProfilesContent.jsx
import { FileTextFilled } from '@ant-design/icons';
import { Breakpoint, Col, Empty, Grid, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/redux.store';
import { graphqlApi } from '../../../redux/services/graphql-api';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { useLazyGetPositionRequestQuery } from '../../../redux/services/graphql-api/position-request.api';
import { useLazyGetPositionQuery } from '../../../redux/services/graphql-api/position.api';
import { WizardProvider } from '../../wizard/components/wizard.provider';
import { JobProfileSearchResults } from './job-profile-search-results.component';
import { JobProfileSearch } from './job-profile-search.component';
import { JobProfile } from './job-profile.component';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface JobProfilesContentProps {
  searchParams: URLSearchParams;
  // searchQuery: string | null;
  onSelectProfile?: (profile: JobProfileModel) => void;
  // onUseProfile?: () => void;
}

const JobProfiles: React.FC<JobProfilesContentProps> = ({ searchParams, onSelectProfile }) => {
  const dispatch = useAppDispatch();
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const [classificationIdFilter, setClassificationIdFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size, adjust as needed
  const [totalResults, setTotalResults] = useState(0); // Total results count from API
  const navigate = useNavigate();
  const { positionRequestId } = useParams();
  const params = useParams();
  const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();
  const [jobProfilesLoading, setJobProfilesLoading] = useState<boolean>(false);

  /*
    AL-85 Code
    // Get Position Request
    //  - Get Reporting To Position ID
    // Get Classification for Position
    //  - Use classification_id and filter jobProfilesQuery
  */

  const [prTrigger, { data: prData }] = useLazyGetPositionRequestQuery();
  const [pTrigger, { data: pData }] = useLazyGetPositionQuery();
  // TODO: Add useLazyGetPositionQuery(<id>)

  useEffect(() => {
    if (positionRequestId != null && prData == null) {
      setJobProfilesLoading(true);
      prTrigger({ id: +positionRequestId });
    }

    const reportsToPositionId = prData?.positionRequest?.reports_to_position_id;
    if (reportsToPositionId != null && pData == null) {
      setJobProfilesLoading(true);
      dispatch(graphqlApi.util.invalidateTags(['jobProfiles']));
      pTrigger({ where: { id: `${reportsToPositionId}` } });
    }

    const classificationId = pData?.position?.classification_id;
    if (classificationId != null && classificationIdFilter == null) {
      setJobProfilesLoading(true);
      setClassificationIdFilter(classificationId);
    }
  }, [positionRequestId, prData, pData, classificationIdFilter, dispatch, pTrigger, prTrigger]);

  useEffect(() => {
    // Use the following for the `search` property.
    // Search terms need to be joined with specific syntax, <-> in this case
    // const search = searchParams.get('search')?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');
    const search = searchParams.get('search');
    const organizationFilter = searchParams.get('ministry_id__in');
    const jobRoleFilter = searchParams.get('job_role_id__in');
    const classificationFilter = searchParams.get('classification_id__in');
    const jobFamilyFilter = searchParams.get('job_family_id__in');
    const jobStreamFilter = searchParams.get('job_stream_id__in');
    setCurrentPage(parseInt(searchParams.get('page') ?? '1'));

    trigger({
      ...(search != null && { search }),
      where: {
        AND: [
          ...(classificationIdFilter != null
            ? [
                {
                  reports_to: {
                    some: {
                      classification_id: {
                        in: [classificationIdFilter],
                      },
                    },
                  },
                },
              ]
            : []),
          ...(organizationFilter != null
            ? [
                {
                  organizations: {
                    some: {
                      organization_id: {
                        in: JSON.parse(`[${organizationFilter.split(',').map((v) => `"${v}"`)}]`),
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
                      classification_id: {
                        in: classificationFilter.split(',').map((v) => v.trim()),
                      },
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
                  role_id: {
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
    });
  }, [searchParams, trigger, currentPage, pageSize, classificationIdFilter]);

  // Update totalResults based on the response (if applicable)
  useEffect(() => {
    if (data) {
      setJobProfilesLoading(false);
    }

    if (data && data.jobProfilesCount !== undefined) {
      setTotalResults(data.jobProfilesCount);
    }
    // if search params has selected profile, ensure we call back to parent
    if (searchParams.get('selectedProfile')) {
      const profileId = searchParams.get('selectedProfile');
      if (profileId) {
        const jobProfile = data?.jobProfiles.find((p) => p.id === parseInt(profileId));
        if (jobProfile) onSelectProfile?.(jobProfile);
      }
    }
  }, [data, onSelectProfile, searchParams]);

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

    navigate({
      pathname: basePath,
      search: searchParams.toString(),
    });
  };

  const getBasePath = (path: string) => {
    if (positionRequestId) return `/position-request/${positionRequestId}`;

    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  };

  // console.log('params: ', params, 'searchParams: ', searchParams.toString());
  const renderJobProfile = () => {
    return params.id || searchParams.get('selectedProfile') ? (
      <JobProfile />
    ) : (
      <div style={{ marginTop: '16rem' }} data-testid="job-profile-empty">
        <Empty
          description={
            <Space direction="vertical" style={{ userSelect: 'none' }}>
              <Title level={1}>Select a Job Profile</Title>
              <Text>Nothing is selected</Text>
            </Space>
          }
          image={<FileTextFilled style={{ fontSize: '60pt' }} />}
        />
      </div>
    );
  };

  console.log('jobProfilesLoading || isLoading: ', jobProfilesLoading, isLoading);
  return (
    <>
      <WizardProvider>
        <JobProfileSearch fullWidth={true} />
        <Row justify="center" gutter={16}>
          {screens['xl'] === true ? (
            <>
              <Col span={8}>
                <JobProfileSearchResults
                  data={data}
                  isLoading={jobProfilesLoading || isLoading}
                  onSelectProfile={onSelectProfile}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalResults={totalResults}
                  onPageChange={handlePageChange}
                />{' '}
              </Col>
              <Col span={16}>{renderJobProfile()}</Col>
            </>
          ) : params.id ? (
            <Col span={24}>{renderJobProfile()}</Col>
          ) : (
            <JobProfileSearchResults
              data={data}
              isLoading={isLoading}
              onSelectProfile={onSelectProfile}
              currentPage={currentPage}
              pageSize={pageSize}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          )}
        </Row>
      </WizardProvider>
    </>
  );
};

export default JobProfiles;
