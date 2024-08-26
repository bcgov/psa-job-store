/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useAuth } from 'react-oidc-context';
import PositionProfile from '../../../components/app/common/components/positionProfile';
import { PositionProvider } from '../../../components/app/common/contexts/position.context';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { useGetProfileQuery } from '../../../redux/services/graphql-api/profile.api';
import { getUserRoles } from '../../../utils/get-user-roles.util';
import { ClassificationTasksPage } from '../../classification-tasks/classification-tasks.page';
import { HomePage as LegacyHomePage } from '../../home-old/home.page';
import { TotalCompDraftProfilesPage } from '../../total-comp-draft-profiles/total-comp-draft-profies.page';
import { getInitialsAvatarProps } from '../utils/get-initials-avatar-props.util';
import { DefaultHomePage } from './default-home-page/default-home-page.component';
import { SuperAdminHomePage } from './super-admin-home-page.component';

const NewHomePage = () => {
  const auth = useAuth();
  const roles = getUserRoles(auth.user);

  const { family_name, given_name } = (auth.user?.profile ?? {}) as Record<string, any>;
  const { data: profileData } = useGetProfileQuery();

  const renderHomePageForRole = useMemo(() => {
    if (roles.includes('super-admin')) {
      return <SuperAdminHomePage />;
    } else {
      return <DefaultHomePage />;
    }
  }, [roles]);

  return auth.isAuthenticated ? (
    <>
      <PageHeader
        avatar={getInitialsAvatarProps(given_name, family_name)}
        title={auth.user ? (auth.user?.profile.display_name as string) : ''}
        subTitle={
          <PositionProfile
            positionNumber={profileData?.profile.position_id}
            mode="compact2"
            unOccupiedText=""
            loadingStyle="skeleton"
          />
        }
      />
      <ContentWrapper>{renderHomePageForRole}</ContentWrapper>
    </>
  ) : (
    <></>
  );
};

export const HomePage = () => {
  const auth = useAuth();
  const roles = getUserRoles(auth.user);

  // auth.user.profile.given_name/family_name

  if (roles.includes('super-admin')) {
    return <NewHomePage />;
  } else if (roles.includes('total-compensation')) {
    return (
      <PositionProvider>
        <TotalCompDraftProfilesPage />
      </PositionProvider>
    );
  } else if (roles.includes('classification')) {
    return (
      <PositionProvider>
        <ClassificationTasksPage />
      </PositionProvider>
    );
  } else if (roles.includes('hiring-manager')) {
    return (
      <PositionProvider>
        <LegacyHomePage />
      </PositionProvider>
    );
  } else {
    return <NewHomePage />;
  }
};
