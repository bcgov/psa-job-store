/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagFilled, TagOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import {
  useGetSavedJobProfileIdsQuery,
  useRemoveSavedJobProfileMutation,
  useSaveJobProfileMutation,
} from '../../../redux/services/graphql-api/saved-job-profile.api';

const { Title, Text, Paragraph } = Typography;

export interface JobProfileCardProps {
  data: JobProfileModel;
  link: string;
}

export const JobProfileCard = ({ data }: JobProfileCardProps) => {
  const [searchParams] = useSearchParams();
  const [saveJobProfile] = useSaveJobProfileMutation();
  const [removeSavedJobProfile] = useRemoveSavedJobProfileMutation();
  const { data: savedJobProfileIds } = useGetSavedJobProfileIdsQuery();
  const [initIsSaved, setInitIsSaved] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (initIsSaved || !savedJobProfileIds) return;
    setIsSaved(savedJobProfileIds?.getSavedJobProfileIds.includes(data.id) || false);
    setInitIsSaved(true);
  }, [data.id, savedJobProfileIds, initIsSaved, setInitIsSaved, setIsSaved]);

  const handleSaveJobProfile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      saveJobProfile({ jobProfileId: data.id });
      setIsSaved(true);
    } catch (error) {
      console.error('Failed to save job profile:', error);
    }
  };

  const handleRemoveSavedJobProfile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      removeSavedJobProfile({ jobProfileId: data.id });
      setIsSaved(false);
    } catch (error) {
      console.error('Failed to remove saved job profile:', error);
    }
  };

  // console.log('card data: ', data, searchParams);
  let { number } = useParams();
  if (!number) number = searchParams.get('selectedProfile') ?? '';

  return (
    <Space
      direction="vertical"
      data-testid="job-profile-card"
      className={data.number === +number ? 'testid-selectedProfile' : ''}
      style={{
        width: '100%',
        cursor: 'pointer',
        borderLeft: data.number === +number ? '4px solid #0070E0' : '4px solid transparent',
        background: data.number === +number ? '#F0F8FF' : 'white',
        padding: '1rem',
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} style={{ fontSize: '1.25rem', lineHeight: '1.25rem' }} data-cy="card-title">
            {typeof data?.title === 'string' ? data?.title : data?.title?.text}
          </Title>
        </Col>
        <Col>
          {initIsSaved && (
            <div>
              {isSaved ? (
                <Tooltip title="Remove from saved profiles">
                  <Button type="link" icon={<TagFilled></TagFilled>} onClick={handleRemoveSavedJobProfile}></Button>
                </Tooltip>
              ) : (
                <Tooltip title="Save profile">
                  <Button type="link" icon={<TagOutlined></TagOutlined>} onClick={handleSaveJobProfile}></Button>
                </Tooltip>
              )}
            </div>
          )}
        </Col>
      </Row>

      <div>
        <Text type="secondary" data-cy="card-classification">
          <b style={{ marginTop: '-0.8rem', marginBottom: '0.7rem', display: 'block' }}>
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
          {typeof data?.overview === 'string' ? data?.overview : data?.overview?.text}
        </Paragraph>
      </div>
      <Button type="link" aria-label={`click to see details for ${data.title}`} style={{ padding: '0' }}>
        See details
      </Button>
    </Space>
  );
};
