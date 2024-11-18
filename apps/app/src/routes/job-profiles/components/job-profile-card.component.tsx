/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinkOutlined, TagFilled, TagOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip, Typography, message } from 'antd';
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
  onSavedCallback?: (isSaved: boolean, data: JobProfileModel) => void;
}

export const JobProfileCard = ({ data, onSavedCallback }: JobProfileCardProps) => {
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
      await saveJobProfile({ jobProfileId: data.id });
      setIsSaved(true);
      onSavedCallback?.(true, data);
    } catch (error) {
      console.error('Failed to save job profile:', error);
    }
  };

  const handleRemoveSavedJobProfile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      await removeSavedJobProfile({ jobProfileId: data.id });
      onSavedCallback?.(false, data);
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
        position: 'relative',
      }}
    >
      <Row gutter={8} align="top" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
        <Col flex="1 1 calc(100% - 32px)">
          <Title level={3} style={{ fontSize: '1.25rem', lineHeight: '1.25rem' }} data-cy="card-title">
            {typeof data?.title === 'string' ? data?.title : data?.title?.text}
          </Title>
        </Col>
        {/* This is for absolutely positioned save button so it appears in correct tab order */}
        <Col flex="0 0 32px">
          <div style={{ width: '32px', height: '32px' }}></div>
        </Col>
      </Row>

      <div>
        <Text type="secondary" data-cy="card-classification">
          <b style={{ marginTop: '-0.8rem', marginBottom: '0.7rem', display: 'block' }}>
            {data.classifications?.map((c) => c.classification.name)[0]}
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
              __html: DOMPurify.sanitize(typeof data?.context === 'string' ? data.context : data.context ?? ''),
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
      <Button
        type="link"
        aria-label={`view details for ${data.title} - ${data.classifications
          ?.map((c) => c.classification.name)
          .join(', ')}`}
        style={{ padding: '0' }}
      >
        See details
      </Button>

      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <Space size={0}>
          {/* Button to copy link to profile */}
          <Tooltip title="Copy link to profile">
            <Button
              aria-label="Copy link to profile"
              type="link"
              icon={<LinkOutlined aria-hidden />}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();

                // copy full path, including host, always link to explore profiles page, e.g.
                // http://localhost:5173/job-profiles/123514, use data.number for the number
                const baseUrl = window.location.origin;
                const fullUrl = `${baseUrl}/job-profiles/${data.number}`;

                navigator.clipboard.writeText(fullUrl).then(() => {
                  message.success('Link copied to clipboard!');
                });
              }}
            ></Button>
          </Tooltip>
          {initIsSaved &&
            (isSaved ? (
              <Tooltip title="Remove from saved profiles">
                <Button
                  aria-label="Remove from saved profiles"
                  type="link"
                  icon={<TagFilled aria-hidden />}
                  onClick={handleRemoveSavedJobProfile}
                ></Button>
              </Tooltip>
            ) : (
              <Tooltip title="Save profile">
                <Button
                  aria-label="Save profile"
                  type="link"
                  icon={<TagOutlined aria-hidden />}
                  onClick={handleSaveJobProfile}
                ></Button>
              </Tooltip>
            ))}
        </Space>
      </div>
    </Space>
  );
};
