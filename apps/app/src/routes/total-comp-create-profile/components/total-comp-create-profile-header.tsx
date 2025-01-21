import { Menu, Typography } from 'antd';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { DownloadJobProfileComponent } from '../../../components/shared/download-job-profile/download-job-profile.component';
import { IdVersion } from '../../../redux/services/graphql-api/job-profile-types';
import { useTestUser } from '../../../utils/useTestUser';
import { FormContext } from './form.context';
import { usePublishConfirm, useSave, useUnPublishConfirm } from './publish-helpers';
import { CopyLinkButton } from './total-comp-create-profile-copy-link.component';
import { DuplicateButton } from './total-comp-create-profile-duplicate.component';
import { useTCContext } from './total-comp-create-profile.provider';

// JobProfileHeader.tsx
interface JobProfileHeaderProps {
  title: string;
}

export const JobProfileHeader: React.FC<JobProfileHeaderProps> = ({ title }) => {
  const { profileJson, setId, jobProfileData, setVersion, link } = useTCContext();

  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form context must be used within FormContext.Provider');
  }
  const { watchedState: state } = context;

  const isTestUser = useTestUser();
  const save = useSave();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isCurrentVersion = jobProfileData?.jobProfile?.is_current_version;
  const showPublishConfirm = usePublishConfirm();
  const showUnPublishConfirm = useUnPublishConfirm();

  const getMenuContent = () => {
    return (
      <Menu selectedKeys={selectedKeys} className={`popover-selector-${jobProfileData?.jobProfile.id}`}>
        <>
          {' '}
          {state === 'PUBLISHED' && (
            <>
              <Menu.Item key="save">
                <div style={{ padding: '5px 0' }}>
                  <DownloadJobProfileComponent jobProfile={profileJson?.jobProfile} ignoreAbsentParent={true}>
                    <div style={{ padding: '5px 0' }}>
                      Download
                      <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                        Download a copy of this job profile.{' '}
                      </Typography.Text>
                    </div>
                  </DownloadJobProfileComponent>
                </div>
              </Menu.Item>
              {isCurrentVersion ? (
                <Menu.Item key="delete" onClick={showUnPublishConfirm}>
                  <div style={{ padding: '5px 0' }}>
                    Unpublish
                    <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                      Remove the job profile from the Job Store.{' '}
                    </Typography.Text>
                  </div>
                </Menu.Item>
              ) : (
                <></>
              )}
              <DuplicateButton
                profileId={jobProfileData?.jobProfile.id}
                version={jobProfileData?.jobProfile.version}
                redirectLink={link}
                variant="menuItem"
              />
              <Menu.Item key="copy">
                <CopyLinkButton
                  baseUrl={link}
                  id={jobProfileData?.jobProfile.id}
                  isTestUser={isTestUser}
                  variant="menuItem"
                  onCopySuccess={() => setSelectedKeys([])}
                />
              </Menu.Item>
            </>
          )}
          {state === 'DRAFT' && !profileJson?.jobProfile.is_archived && (
            <>
              <Menu.Item key="create" onClick={showPublishConfirm}>
                <div style={{ padding: '5px 0' }}>
                  Publish
                  <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                    Publish the job profile to the Job Store.{' '}
                  </Typography.Text>
                </div>
              </Menu.Item>
              <Menu.Item key="copy">
                <CopyLinkButton
                  baseUrl={link}
                  id={jobProfileData?.jobProfile.id}
                  isTestUser={isTestUser}
                  variant="menuItem"
                  onCopySuccess={() => setSelectedKeys([])}
                />
              </Menu.Item>
            </>
          )}
          {state === 'DRAFT' && profileJson?.jobProfile.is_archived && (
            <>
              <Menu.Item key="create" onClick={showPublishConfirm}>
                Restore
                <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                  Unarchive the job profile.{' '}
                </Typography.Text>
              </Menu.Item>
              <DuplicateButton
                profileId={jobProfileData?.jobProfile.id}
                version={jobProfileData?.jobProfile.version}
                redirectLink={link}
                variant="menuItem"
              />
              <Menu.Item key="save">
                <div style={{ padding: '5px 0' }}>
                  <DownloadJobProfileComponent jobProfile={profileJson?.jobProfile} ignoreAbsentParent={true}>
                    <div style={{ padding: '5px 0' }}>
                      Download
                      <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                        Download a copy of this job profile.{' '}
                      </Typography.Text>
                    </div>
                  </DownloadJobProfileComponent>
                </div>
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    );
  };

  const getDisplayTitle = () => {
    if (location.pathname.startsWith('/job-profiles/manage/draft') && title.trim() === '') {
      return 'New profile';
    }
    if (!location.pathname.startsWith('/job-profiles/manage/draft') && title.trim() === '') {
      return 'Untitled';
    }
    return title;
  };

  return (
    <PageHeader
      title={getDisplayTitle()}
      showButton1
      showButton2
      button1Content={getMenuContent}
      button2Text={state === 'PUBLISHED' ? 'Save and publish' : 'Save as draft'}
      button2Callback={async () => {
        await save({ isPublishing: state === 'PUBLISHED' });
      }}
      versions={jobProfileData?.jobProfileMeta}
      // selectVersionCallback={(selectedVersion: IdVersion) => {
      //   navigate(`/job-profiles/manage/published/${selectedVersion.id}?version=${selectedVersion.version}`);
      // }}
      selectVersionCallback={(selectedVersion: IdVersion) => {
        setId(selectedVersion.id.toString());
        setVersion(selectedVersion.version.toString());
        navigate('/job-profiles/manage/published/' + selectedVersion.id + '?version=' + selectedVersion.version);
      }}
    />
  );
};
