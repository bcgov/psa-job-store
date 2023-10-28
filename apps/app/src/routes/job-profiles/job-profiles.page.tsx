import { FileTextFilled } from '@ant-design/icons';
import { Breakpoint, Col, Empty, Grid, Row, Space, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetClassificationsQuery } from '../../redux/services/graphql-api/classification.api';
import { useGetJobFamiliesQuery } from '../../redux/services/graphql-api/job-family.api';
import { useLazyGetJobProfilesQuery } from '../../redux/services/graphql-api/job-profile.api';
import { useGetJobRolesQuery } from '../../redux/services/graphql-api/job-role.api';
import { useGetMinistriesQuery } from '../../redux/services/graphql-api/ministry.api';
import { JobProfileSearchResults } from './components/job-profile-search-results.component';
import { JobProfileSearch } from './components/job-profile-search.component';
import { JobProfile } from './components/job-profile.component';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export const JobProfilesPage = () => {
  const [searchParams] = useSearchParams();
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const searchQuery = searchParams.get('search');

  // Use the useGetMinistriesQuery hook to fetch ministries
  const ministryData = useGetMinistriesQuery(null).data?.ministries;
  const jobFamilyData = useGetJobFamiliesQuery(null).data?.jobFamilies;
  const jobRoleData = useGetJobRolesQuery(null).data?.jobRoles;
  const classificationData = useGetClassificationsQuery(null).data?.resolvedClassifications;

  const filters = useMemo(() => {
    return {
      Ministry: ministryData?.map((ministry) => ({
        value: ministry.id.toString(),
        label: ministry.name,
      })),
      'Job Family': jobFamilyData?.map((jobFamily) => ({
        value: jobFamily.id.toString(),
        label: jobFamily.name,
      })),
      'Job Roles': jobRoleData?.map((jobRole) => ({
        value: jobRole.id.toString(),
        label: jobRole.name,
      })),
      Classification: classificationData?.map((classification) => ({
        value: classification.id.toString(),
        label: classification.occupation_group.name + classification.grid.name,
      })),
    };
  }, [ministryData, jobFamilyData, jobRoleData, classificationData]);

  useEffect(() => {
    const search = searchParams.get('search')?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');
    const selectedMinistry = searchParams.get('ministry');
    const selectedJobRole = searchParams.get('job-role');
    const selectedClassification = searchParams.get('classification');
    const selectedJobFamily = searchParams.get('job-family');
    trigger({
      where: {
        AND: [
          {
            ...(search != null && {
              title: {
                search,
              },
              context: {
                search,
              },
              overview: {
                search,
              },
            }),
          },
          {
            ...(selectedMinistry != null && {
              ministry_id: {
                equals: parseInt(selectedMinistry),
              },
            }),
            ...(selectedClassification != null && {
              classification_id: {
                equals: parseInt(selectedClassification),
              },
            }),
            ...(selectedJobFamily != null && {
              family_id: {
                equals: parseInt(selectedJobFamily),
              },
            }),
            ...(selectedJobRole != null && {
              role_id: {
                equals: parseInt(selectedJobRole),
              },
            }),
          },
        ],
      },
    });
  }, [filters, searchParams, trigger]);

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
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader title="Job Profiles" subTitle="Find a Job Profile which suits your needs " />
        {/* <div>{`Ministry: ${ministryName}`}</div> */}
        <JobProfileSearch filterData={filters} search />

        <div style={{ margin: '0 1rem' }}>
          <Row justify="center" gutter={16}>
            {screens['xl'] === true ? (
              <>
                <Col span={8}>
                  <JobProfileSearchResults data={data} isLoading={isLoading} />
                </Col>
                <Col span={16}>{renderJobProfile()}</Col>
              </>
            ) : params.id ? (
              <Col span={24}>{renderJobProfile()}</Col>
            ) : (
              <JobProfileSearchResults data={data} isLoading={isLoading} />
            )}
          </Row>

          {/* <Row justify="center" gutter={16}>
            <Col lg={24}>{params.id ? <JobProfile /> : <JobProfileSearchResults data={data} />}</Col>
          </Row> */}

          {/* <Row justify="center" gutter={16}>
            <Col lg={params.id ? 0 : 24} xl={8}>
              <JobProfileSearchResults data={data} />
            </Col>
            <Col lg={params.id ? 0 : 24} xl={14}>
              {params.id ? (
                <JobProfile />
              ) : (
                <Empty
                  description={
                    <Space direction="vertical" style={{ marginTop: '16rem', userSelect: 'none' }}>
                      <Title level={1}>Select a Job Profile</Title>
                      <Text>Nothing is selected</Text>
                    </Space>
                  }
                  image={<FileTextFilled style={{ fontSize: '60pt' }} />}
                />
              )}
            </Col>
          </Row> */}
        </div>
      </Space>
    </>
  );
};
