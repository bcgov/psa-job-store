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
  searchQuery: string | null;
  onSelectProfile?: (id: string) => void;
}

const JobProfiles: React.FC<JobProfilesContentProps> = ({ searchQuery, onSelectProfile }) => {
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();

  useEffect(() => {
    const search = searchQuery?.replace(/(\w)\s+(\w)/g, '$1 <-> $2');

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
        ],
      },
    });
  }, [searchQuery, trigger]);

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
  );
};

export default JobProfiles;
