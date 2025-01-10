import { Button, Card, Col, Divider, Input, Row, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownloadJobProfileComponent } from '../../../components/shared/download-job-profile/download-job-profile.component';
import { useTestUser } from '../../../utils/useTestUser';
import { showPublishConfirm, showUnPublishConfirm, useSave } from './publish-helpers';
import { CopyLinkButton } from './total-comp-create-profile-copy-link.component';
import { DuplicateButton } from './total-comp-create-profile-duplicate.component';
import { useTCContext } from './total-comp-create-profile.provider';

interface TotalCompCreateJobProfileActionsProps {}

export const TotalCompCreateJobProfileActions: React.FC<TotalCompCreateJobProfileActionsProps> = ({}) => {
  const { state, isCurrentVersion, jobProfileMeta, profileJson, jobProfileData, link } = useTCContext();
  const save = useSave();
  const isTestUser = useTestUser();
  const navigate = useNavigate();

  return (
    <>
      <Row justify="center" style={{ margin: '1rem 0' }}>
        <Col xs={24} sm={24} md={24} lg={20} xl={16}>
          {/* Save as Draft Card */}
          {state != 'PUBLISHED' && (
            <Card title="Save as Draft">
              <Typography.Text>Save your progress and come back later to make changes.</Typography.Text>
              <br></br>
              <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={async () => {
                  await save();
                }}
              >
                Save as Draft
              </Button>
            </Card>
          )}

          {state == 'PUBLISHED' && isCurrentVersion && (
            <Card title="Save and publish">
              <Typography.Text>Save your progress and publish changes.</Typography.Text>
              <br></br>
              <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={async () => {
                  await save({ isPublishing: true });
                }}
              >
                Save and publish
              </Button>
            </Card>
          )}

          {state == 'PUBLISHED' && !isCurrentVersion && jobProfileMeta?.jobProfileMeta.versions && (
            <Card>
              <Typography.Title level={5}>Publish</Typography.Title>
              <Typography.Text>
                This will replace the existing published version in the job store. If published, it will be Version{' '}
                {Number(
                  jobProfileMeta?.jobProfileMeta.versions
                    .map((version: any) => version.version)
                    .sort((a: any, b: any) => b - a)[0],
                ) + 1}
                .
              </Typography.Text>
              <br></br>
              <Button type="primary" style={{ marginTop: 10 }} onClick={showPublishConfirm}>
                Publish as latest version
              </Button>
            </Card>
          )}

          {/* Other Actions Card */}
          <Card style={{ marginTop: 24 }} title="Other Actions">
            {state != 'PUBLISHED' && (
              <>
                <Typography.Title level={5}>Publish</Typography.Title>
                <Typography.Text>
                  Publish the job profile to the Job Store will allow hiring managers view the profile.
                </Typography.Text>
                <br></br>
                <Button type="primary" style={{ marginTop: 10 }} onClick={showPublishConfirm}>
                  Publish Profile
                </Button>
                <Divider></Divider>
              </>
            )}

            {jobProfileMeta?.jobProfileMeta.versions && isCurrentVersion && (
              <>
                <Typography.Title level={5}>Download job profile</Typography.Title>
                <Typography.Text>Download a copy of the job profile.</Typography.Text>
                <br></br>
                <DownloadJobProfileComponent
                  jobProfile={profileJson?.jobProfile}
                  style={{ marginTop: 10 }}
                  ignoreAbsentParent={true}
                ></DownloadJobProfileComponent>
                <Divider></Divider>
              </>
            )}

            {state == 'PUBLISHED' && jobProfileMeta?.jobProfileMeta.versions && (
              <>
                <Typography.Title level={5}>Duplicate</Typography.Title>

                <Typography.Text style={{ marginTop: '5px', display: 'block' }}>
                  This will create a draft copy of this version of the job profile.{' '}
                </Typography.Text>
                <DuplicateButton
                  profileId={jobProfileData?.jobProfile.id}
                  version={jobProfileData?.jobProfile.version}
                  redirectLink={link}
                />
                <Divider></Divider>
              </>
            )}

            {state == 'PUBLISHED' && isCurrentVersion && (
              <>
                <Typography.Title level={5}>Unpublish</Typography.Title>
                <Typography.Text>
                  Unpublishing the job profile from the Job Store will remove public access to the profile. After which
                  you can access the profile from the ‘Drafts’ section.
                </Typography.Text>
                <br></br>
                <Button style={{ marginTop: 10 }} onClick={showUnPublishConfirm}>
                  Unpublish profile
                </Button>
                <Divider></Divider>
              </>
            )}

            {!isCurrentVersion && (
              <>
                <div>
                  <Typography.Title level={5}>Copy Link</Typography.Title>
                  <p>
                    Share the URL with people who you would like to view this version of the job profile (IDIR
                    restricted).
                  </p>
                  <Space.Compact style={{ width: '70%' }}>
                    <Input
                      readOnly
                      value={`${window.location.origin}/job-profiles/manage/published/${profileJson?.jobProfile.id}?version=${profileJson?.jobProfile.version}`}
                    ></Input>
                    <CopyLinkButton baseUrl={link} id={jobProfileData?.jobProfile.id} isTestUser={isTestUser} />
                  </Space.Compact>
                  <Divider></Divider>
                </div>
              </>
            )}

            {state == 'PUBLISHED' && (
              <>
                <Typography.Title level={5}>View all published profiles</Typography.Title>
                <Typography.Text>View all published profiles that you have created.</Typography.Text>
                <br></br>
                <Button style={{ marginTop: 10 }} onClick={() => navigate('/job-profiles/manage/published')}>
                  Go to published profiles
                </Button>
              </>
            )}

            {state != 'PUBLISHED' && (
              <>
                <Typography.Title level={5}>View all profiles</Typography.Title>
                <Typography.Text>View all profiles that you have created.</Typography.Text>
                <br></br>
                <Button style={{ marginTop: 10 }} onClick={() => navigate('/job-profiles/manage/draft')}>
                  Go to drafts
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
