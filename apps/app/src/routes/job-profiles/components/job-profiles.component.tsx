// JobProfilesContent.jsx
import { FileTextFilled } from '@ant-design/icons';
import { Breakpoint, Col, Empty, Grid, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { JobProfileSearchResults } from './job-profile-search-results.component';
import { JobProfileSearch } from './job-profile-search.component';
import { JobProfile } from './job-profile.component';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface JobProfilesContentProps {
  searchParams: URLSearchParams;
  // searchQuery: string | null;
  onSelectProfile?: (id: string) => void;
  onUseProfile?: () => void;
}

const JobProfiles: React.FC<JobProfilesContentProps> = ({ searchParams, onSelectProfile, onUseProfile }) => {
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2); // Default page size, adjust as needed
  const [totalResults, setTotalResults] = useState(0); // Total results count from API

  useEffect(() => {
    // Use the following for the `search` property.
    // Search terms need to be joined with specific syntax, <-> in this case
    // const search = searchParams.get('search')?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');
    const search = searchParams.get('search');
    const organizationFilter = searchParams.get('ministry_id__in');
    const careerGroupFilter = searchParams.get('career_group_id__in');
    const jobRoleFilter = searchParams.get('job_role_id__in');
    const classificationFilter = searchParams.get('classification_id__in');
    const jobFamilyFilter = searchParams.get('job_family_id__in');
    setCurrentPage(parseInt(searchParams.get('page') ?? '1'));

    trigger({
      ...(search != null && { search }),
      where: {
        AND: [
          ...(organizationFilter != null
            ? [
                {
                  organizations: {
                    some: {
                      organization_id: {
                        in: organizationFilter.split(',').map((v) => v.trim()),
                      },
                    },
                  },
                },
              ]
            : []),
          ...(careerGroupFilter !== null
            ? [
                {
                  career_group_id: {
                    in: JSON.parse(`[${careerGroupFilter}]`),
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
                  job_family_id: {
                    in: JSON.parse(`[${jobFamilyFilter}]`),
                  },
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
        ],
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }, [searchParams, trigger, currentPage, pageSize]);

  // Update totalResults based on the response (if applicable)
  useEffect(() => {
    if (data && data.jobProfilesCount !== undefined) {
      setTotalResults(data.jobProfilesCount);
    }
  }, [data]);

  const navigate = useNavigate();
  const { positionRequestId } = useParams();

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

  const params = useParams();
  const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();

  // console.log('params: ', params, 'searchParams: ', searchParams.toString());
  const renderJobProfile = () => {
    return params.id || searchParams.get('selectedProfile') ? (
      <JobProfile onUseProfile={onUseProfile} />
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

  return (
    <>
      <JobProfileSearch />
      <Row justify="center" gutter={16}>
        {screens['xl'] === true ? (
          <>
            <Col span={8}>
              <JobProfileSearchResults
                data={data}
                isLoading={isLoading}
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
    </>
  );
};

export default JobProfiles;
