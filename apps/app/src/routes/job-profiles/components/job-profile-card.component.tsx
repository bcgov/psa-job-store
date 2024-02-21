/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Tooltip, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { useSearchParams } from 'react-router-dom';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';

const { Title, Text, Paragraph } = Typography;

export interface JobProfileCardProps {
  data: JobProfileModel;
  link: string;
}

export const JobProfileCard = ({ data }: JobProfileCardProps) => {
  const [searchParams] = useSearchParams();

  // console.log('card data: ', data, searchParams);

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        cursor: 'pointer',
        borderLeft:
          data.id === +(searchParams.get('selectedProfile') ?? 0) ? '4px solid #0070E0' : '4px solid transparent',
        background: data.id === +(searchParams.get('selectedProfile') ?? 0) ? '#F0F8FF' : 'white',
        padding: '1rem',
      }}
    >
      <Title level={2} style={{ fontSize: '1.25rem', lineHeight: '1.25rem' }} data-cy="card-title">
        {typeof data?.title === 'string' ? data?.title : data?.title?.value}
      </Title>
      <div>
        <Text type="secondary" data-cy="card-classification">
          <b style={{ marginTop: '-0.8rem', marginBottom: '1rem', display: 'block' }}>
            {data.classifications?.map((c) => c.classification.name).join(', ')}
          </b>
        </Text>
        <Text type="secondary" data-cy="card-info">
          # {data.number} |{' '}
          {data.all_organizations ? (
            <>All ministries</>
          ) : data.organizations.length > 1 ? (
            <Tooltip
              title={data.organizations.map((o) => (
                <div key={o.organization.name}>{o.organization.name}</div>
              ))}
            >
              {data.organizations.length} Ministries
            </Tooltip>
          ) : (
            data.organizations[0]?.organization.name
          )}{' '}
          {data.role_type && <>| {data.role_type.name}</>}
        </Text>
      </div>
      <div>
        <Text strong>Context: </Text>

        <Paragraph ellipsis={{ rows: 3 }}>
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                typeof data?.context === 'string' ? data.context : data.context.description ?? '',
              ),
            }}
          ></span>
        </Paragraph>
      </div>
      <div>
        <Text strong>Overview:</Text>
        <Paragraph ellipsis={{ rows: 3 }}>
          {typeof data?.overview === 'string' ? data?.overview : data?.overview?.value}
        </Paragraph>
      </div>
      <Button type="link" aria-label={`click to see details for ${data.title}`} style={{ padding: '0' }}>
        See details
      </Button>
    </Space>
  );
};
