import { Card, Col, Descriptions, Row, Tag, Typography } from 'antd';
import { useTCContext } from './total-comp-create-profile.provider';

interface TotalCompCreateJobProfileInfoProps {
  // title: string;
  // state: string;
  // jobProfileData?: any;
  // profileJson?: any;
  // isTestUser: boolean;
  // onSave: (isPublished: boolean) => Promise<void>;
  // onUnpublish: () => void;
  // onPublish: () => void;
  // setId: (id: string) => void;
  // setVersion: (version: string) => void;
}

export const TotalCompCreateJobProfileInfo: React.FC<TotalCompCreateJobProfileInfoProps> = (
  {
    // title,
    // state,
    // jobProfileData,
    // profileJson,
    // isTestUser,
    // onSave,
    // onUnpublish,
    // onPublish,
    // setId,
    // setVersion,
  },
) => {
  const {
    jobProfileMeta,
    profileJson,
    isCurrentVersion,
    versionInReview,
    versionCompleted,
    totalInReview,
    totalCompleted,
  } = useTCContext();

  return (
    <>
      {/* <Card title="">
<Typography.Text>Total Views</Typography.Text>
<br></br>
</Card>
*/}

      <Row
        style={{
          marginTop: '24px',
          marginBottom: '24px',
          marginLeft: '48px',
          marginRight: '48px',
          paddingLeft: '0',
        }}
        gutter={12}
      >
        <Col className="gutter-row" span={24}>
          <Card
            bodyStyle={{
              padding: '0',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #D9D9D9',
            }}
          >
            <Card.Meta
              title={
                <>
                  Version
                  {' ' + profileJson?.jobProfile.version + ' '}
                  {isCurrentVersion && <Tag color={'green'}>Latest</Tag>}
                </>
              }
              style={{
                padding: '16px',
                backgroundColor: 'white',
              }}
            ></Card.Meta>
            <Descriptions
              className="customDescriptions"
              bordered
              column={24}
              items={[
                {
                  key: 'updated by',
                  label: <Typography.Title level={3}>Updated by</Typography.Title>,
                  children: <span tabIndex={0}>{profileJson?.jobProfile?.updated_by?.name}</span>,
                  span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                },
                {
                  key: 'updated at',
                  label: <Typography.Title level={3}>Updated at</Typography.Title>,
                  children: (
                    <span tabIndex={0}>
                      {profileJson?.jobProfile?.updated_at &&
                        new Intl.DateTimeFormat('en-CA', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          hour12: false,
                          minute: '2-digit',
                          second: '2-digit',
                        }).format(new Date(profileJson?.jobProfile?.updated_at))}
                    </span>
                  ),
                  span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                },
              ]}
              labelStyle={{
                fontWeight: 700,
                verticalAlign: 'top',
                background: '#FAFAFA',
              }}
              contentStyle={{
                background: 'white',
                verticalAlign: 'top',
              }}
              style={{ marginBottom: '-12px', padding: '12px' }}
            />
            <Card
              style={{
                margin: '12px',
              }}
            >
              <Row justify="center" align="middle">
                <Col
                  span={8}
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  Views
                </Col>

                <Col
                  span={8}
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  In Review
                </Col>
                <Col
                  span={8}
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  Completed
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col
                  span={8}
                  style={{
                    padding: '4px',
                  }}
                >
                  <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
                    {profileJson?.jobProfile?.views}
                  </Typography>
                </Col>
                <Col
                  span={8}
                  style={{
                    padding: '4px',
                  }}
                >
                  <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{versionInReview}</Typography>
                </Col>

                <Col
                  span={8}
                  style={{
                    padding: '4px',
                  }}
                >
                  <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{versionCompleted}</Typography>
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
      </Row>
      <Card
        style={{
          marginTop: '24px',
          marginBottom: '24px',
          marginLeft: '48px',
          marginRight: '48px',
          paddingLeft: '0',
        }}
        bodyStyle={{
          padding: '0',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          border: '1px solid #D9D9D9',
        }}
      >
        <Card.Meta
          title="All versions"
          style={{
            padding: '16px',
            backgroundColor: 'white',
          }}
        ></Card.Meta>
        <Descriptions
          className="customDescriptions"
          bordered
          column={24}
          items={[
            // {
            //   key: 'Last updated by',
            //   label: <Typography.Title level={3}>Last updated by</Typography.Title>,
            //   children: <span tabIndex={0}>{profileJson?.jobProfile?.updated_by?.name}</span>,
            //   span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
            // },
            // {
            //   key: 'Last updated at',
            //   label: <Typography.Title level={3}>Last updated at</Typography.Title>,
            //   children: <span tabIndex={0}>{profileJson?.jobProfile?.updated_at}</span>,
            //   span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
            // },
            {
              key: 'First published by',
              label: <Typography.Title level={3}>First published by</Typography.Title>,
              children: <span tabIndex={0}>{jobProfileMeta?.jobProfileMeta.firstPublishedBy?.user}</span>,
              span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
            },
            {
              key: 'First published at',
              label: <Typography.Title level={3}>First published at</Typography.Title>,
              children: (
                <span tabIndex={0}>
                  {jobProfileMeta?.jobProfileMeta.firstPublishedBy?.date &&
                    new Intl.DateTimeFormat('en-CA', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      hour12: false,
                      minute: '2-digit',
                      second: '2-digit',
                    }).format(new Date(jobProfileMeta.jobProfileMeta.firstPublishedBy.date))}
                </span>
              ),
              span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
            },
            {
              key: 'Created by',
              label: <Typography.Title level={3}>Created by</Typography.Title>,
              children: <span tabIndex={0}>{jobProfileMeta?.jobProfileMeta.firstCreatedBy?.owner ?? ''}</span>,
              span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
            },
            {
              key: 'Created at',
              label: <Typography.Title level={3}>Created at</Typography.Title>,
              children: (
                <span tabIndex={0}>
                  {jobProfileMeta?.jobProfileMeta.firstCreatedBy?.date &&
                    new Intl.DateTimeFormat('en-CA', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      hour12: false,
                      minute: '2-digit',
                      second: '2-digit',
                    }).format(new Date(jobProfileMeta.jobProfileMeta.firstCreatedBy.date))}
                </span>
              ),
              span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
            },
          ]}
          labelStyle={{
            fontWeight: 700,
            verticalAlign: 'top',
            background: '#FAFAFA',
          }}
          contentStyle={{
            background: 'white',
            verticalAlign: 'top',
          }}
          style={{ marginBottom: '-12px', padding: '12px' }}
        />
        <Card
          style={{
            margin: '12px',
          }}
        >
          <Row justify="center" align="middle">
            <Col
              span={8}
              style={{
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Total views
            </Col>

            <Col
              span={8}
              style={{
                padding: '8px',
                textAlign: 'center',
              }}
            >
              In Review
            </Col>
            <Col
              span={8}
              style={{
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Completed
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col
              span={8}
              style={{
                padding: '4px',
              }}
            >
              <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
                {jobProfileMeta?.jobProfileMeta.totalViews}
              </Typography>
            </Col>
            <Col
              span={8}
              style={{
                padding: '4px',
              }}
            >
              <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{totalInReview}</Typography>
            </Col>

            <Col
              span={8}
              style={{
                padding: '4px',
              }}
            >
              <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{totalCompleted}</Typography>
            </Col>
          </Row>
        </Card>
      </Card>
    </>
  );
};
