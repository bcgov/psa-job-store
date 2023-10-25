/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile.api';

const { Title, Text, Paragraph } = Typography;

export interface JobProfileCardProps {
  data: JobProfileModel;
}

export const JobProfileCard = ({ data }: JobProfileCardProps) => {
  const params = useParams();

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        cursor: 'pointer',
        borderLeft: data.id === +(params.id ?? 0) ? '4px solid #5a7def' : '4px solid transparent',
        padding: '1rem',
      }}
    >
      <Title level={1} style={{ fontSize: '1.25rem', lineHeight: '1.25rem' }}>
        {data.title}
      </Title>
      <div>
        <Text type="secondary">
          {/* {data.classification.occupation_group.name} {data.classification.grid.name} | Job Store # {data.number} */}
          {/* {data.classification.occupation_group.name} {data.classification.grid.name} | Job Store # {data.number} */}
        </Text>
        <br />
        <Text type="secondary">Reports to excluded manager</Text>
      </div>
      <div>
        <Text strong>Context: </Text>
        <Paragraph ellipsis={{ rows: 3 }}>{data.context}</Paragraph>
      </div>
      <div>
        <Text strong>Overview:</Text>
        <Paragraph ellipsis={{ rows: 3 }}>{data.overview}</Paragraph>
      </div>
    </Space>
  );
};
