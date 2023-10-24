import { FileTextFilled } from '@ant-design/icons';
import { Breakpoint, Col, Empty, Grid, Row, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import { useLazyGetJobProfilesQuery } from '../../redux/services/graphql-api/job-profile.api';
import { JobProfileSearchResults } from './components/job-profile-search-results.component';
import { JobProfileSearch } from './components/job-profile-search.component';
import { JobProfile } from './components/job-profile.component';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export const JobProfilesPage = () => {
  const [trigger, { data }] = useLazyGetJobProfilesQuery();

  useEffect(() => {
    trigger({});
  }, []);

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
        <PageHeader title="Job Profiles" subTitle="Find a Job Profile which suits your needs" />
        <JobProfileSearch />
        <div style={{ margin: '0 1rem' }}>
          <Row justify="center" gutter={16}>
            {screens['xl'] === true ? (
              <>
                <Col span={8}>
                  <JobProfileSearchResults data={data} />
                </Col>
                <Col span={16}>{renderJobProfile()}</Col>
              </>
            ) : params.id ? (
              <Col span={24}>{renderJobProfile()}</Col>
            ) : (
              <JobProfileSearchResults data={data} />
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
