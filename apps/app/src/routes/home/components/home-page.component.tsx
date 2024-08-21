/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useAuth } from 'react-oidc-context';
import PositionProfile from '../../../components/app/common/components/positionProfile';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { useGetProfileQuery } from '../../../redux/services/graphql-api/profile.api';
import { getUserRoles } from '../../../utils/get-user-roles.util';
import { getInitialsAvatarProps } from '../utils/get-initials-avatar-props.util';
import { DefaultHomePage } from './default-home-page/default-home-page.component';
import { SuperAdminHomePage } from './super-admin-home-page.component';

export const HomePage = () => {
  const auth = useAuth();
  const roles = getUserRoles(auth.user);

  const { family_name, given_name } = (auth.user?.profile ?? {}) as Record<string, any>;
  const { data: profileData } = useGetProfileQuery();

  // auth.user.profile.given_name/family_name

  const renderHomePageForRole = useMemo(() => {
    if (roles.includes('super-admin')) {
      return <SuperAdminHomePage />;
    } else if (roles.includes('total-compensation')) {
      return <DefaultHomePage />;
    } else if (roles.includes('classification')) {
      return <DefaultHomePage />;
    } else if (roles.includes('hiring-manager')) {
      return <DefaultHomePage />;
    } else {
      return <DefaultHomePage />;
    }
  }, [roles]);

  return (
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
  );
};
