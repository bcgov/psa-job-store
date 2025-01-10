import { Alert, Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import ContentWrapper from '../../../components/content-wrapper.component';
import { TotalCompCreateJobProfileActions } from './total-comp-create-profile-actions.component';
import { BasicDetails } from './total-comp-create-profile-basic-details.component';
import { TotalCompCreateJobProfileInfo } from './total-comp-create-profile-info.component';
import { TotalCompCreateJobProfile } from './total-comp-create-profile-job-profile.component';
import { useTCContext } from './total-comp-create-profile.provider';

interface TabBarProps {}

const TCTabBar: React.FC<TabsProps & TabBarProps> = ({}) => {
  const { jobProfileMeta, isCurrentVersion, link } = useTCContext();

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} />
      {jobProfileMeta && !isCurrentVersion && (
        <Alert
          banner
          message={
            <>
              You are viewing an older version of this job profile. To go to the latest version, click the link:{' '}
              <Link to={link + [...jobProfileMeta.jobProfileMeta.versions].sort((a, b) => b.version - a.version)[0].id}>
                Version {[...jobProfileMeta.jobProfileMeta.versions].sort((a, b) => b.version - a.version)[0].version}
              </Link>
            </>
          }
          style={{ marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-16px' }}
        ></Alert>
      )}
    </StickyBox>
  );

  const tabItems = [
    {
      key: '1',
      label: 'Basic details',
      children: <BasicDetails></BasicDetails>,
    },
    {
      key: '2',
      label: 'Job profile',
      children: <TotalCompCreateJobProfile></TotalCompCreateJobProfile>,
    },

    {
      key: '4',
      label: 'Actions',
      children: <TotalCompCreateJobProfileActions></TotalCompCreateJobProfileActions>,
    },
  ];
  if (jobProfileMeta)
    tabItems.push(
      jobProfileMeta && {
        key: '5',
        label: 'Info',
        children: <TotalCompCreateJobProfileInfo></TotalCompCreateJobProfileInfo>,
      },
    );

  return (
    <ContentWrapper padTop={false}>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem 1rem -1rem', padding: '0 1rem 0px 1rem' }}
        renderTabBar={renderTabBar}
      />
    </ContentWrapper>
  );
};

export default TCTabBar;
