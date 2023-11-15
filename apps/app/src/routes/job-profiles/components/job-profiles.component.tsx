// JobProfilesContent.jsx
import { FileTextFilled } from '@ant-design/icons';
import { Breakpoint, Col, Empty, Grid, Row, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
}

const JobProfiles: React.FC<JobProfilesContentProps> = ({ searchParams, onSelectProfile }) => {
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();

  useEffect(() => {
    // Use the following for the `search` property.
    // Search terms need to be joined with specific syntax, <-> in this case
    // const search = searchParams.get('search')?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');
    const search = searchParams.get('search');
    const ministryFilter = searchParams.get('ministry_id__in');
    const jobRoleFilter = searchParams.get('job_role_id__in');
    const classificationFilter = searchParams.get('classification_id__in');
    const jobFamilyFilter = searchParams.get('job_family_id__in');

    trigger({
      where: {
        AND: [
          {
            OR: [
              ...(search != null
                ? [
                    {
                      title: {
                        contains: searchParams.get('search'),
                        mode: 'insensitive',
                      },
                    },
                    {
                      context: {
                        contains: searchParams.get('search'),
                        mode: 'insensitive',
                      },
                    },
                    {
                      overview: {
                        contains: searchParams.get('search'),
                        mode: 'insensitive',
                      },
                    },
                  ]
                : []),
            ],
          },
          ...(ministryFilter != null
            ? [
                {
                  ministry_id: {
                    in: JSON.parse(`[${ministryFilter}]`),
                  },
                },
              ]
            : []),
          ...(classificationFilter != null
            ? [
                {
                  classification_id: {
                    in: JSON.parse(`[${classificationFilter.split(',').map((v) => `"${v}"`)}]`),
                  },
                },
              ]
            : []),
          ...(jobFamilyFilter !== null
            ? [
                {
                  family_id: {
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
    });
  }, [searchParams, trigger]);

  const params = useParams();
  const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();

  const renderJobProfile = () => {
    return params.id ? (
      <JobProfile />
    ) : (
      <div style={{ marginTop: '16rem' }}>
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
    <div style={{ margin: '0 1rem' }}>
      <JobProfileSearch />
      <Row justify="center" gutter={16}>
        {screens['xl'] === true ? (
          <>
            <Col span={8}>
              <JobProfileSearchResults data={data} isLoading={isLoading} onSelectProfile={onSelectProfile} />
            </Col>
            <Col span={16}>{renderJobProfile()}</Col>
          </>
        ) : params.id ? (
          <Col span={24}>{renderJobProfile()}</Col>
        ) : (
          <JobProfileSearchResults data={data} isLoading={isLoading} onSelectProfile={onSelectProfile} />
        )}
      </Row>
    </div>
  );
};

export default JobProfiles;
