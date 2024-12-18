/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import PositionProfile from '../../../components/app/common/components/positionProfile';
import { PositionProvider } from '../../../components/app/common/contexts/position.context';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { useTypedSelector } from '../../../redux/redux.hooks';
import { getUserRoles } from '../../../utils/get-user-roles.util';
import { ClassificationTasksPage } from '../../classification-tasks/classification-tasks.page';
import { HomePage as LegacyHomePage } from '../../home-old/home.page';
import { TotalCompDraftProfilesPage } from '../../total-comp-draft-profiles/total-comp-draft-profies.page';
import UnauthorizedPage from '../../unauthorized/unauthorized.page';
import { getInitialsAvatarProps } from '../utils/get-initials-avatar-props.util';
import { ABCHomePage } from './abc-home-page.component';
import { DefaultHomePage } from './default-home-page/default-home-page.component';
import { SuperAdminHomePage } from './super-admin-home-page.component';

const NewHomePage = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const roles = getUserRoles(auth.user);

  console.log('auth.user: ', auth.user);

  const { family_name, given_name, name } = (auth.user ?? {}) as Record<string, any>;
  const nameParts = useMemo(() => {
    const parts = name.split(' ');

    const first = parts.length > 0 ? parts[0] : '';
    const last = parts.length > 1 ? parts[1] : '';

    return { first, last };
  }, [name]);

  const renderHomePageForRole = useMemo(() => {
    if (roles.includes('super-admin')) {
      return <SuperAdminHomePage />;
    } else if (roles.includes('idir')) {
      return <DefaultHomePage />;
    } else if (roles.includes('bceid')) {
      return <ABCHomePage />;
    }
  }, [roles]);

  return auth.isAuthenticated ? (
    <>
      <PageHeader
        avatar={
          roles.includes('bceid')
            ? getInitialsAvatarProps(nameParts.first, nameParts.last)
            : getInitialsAvatarProps(given_name, family_name)
        }
        title={auth.user ? (auth.user?.name as string) : ''}
        subTitle={
          !roles.includes('bceid') ? (
            <PositionProfile
              positionNumber={auth.user?.metadata.peoplesoft.position_id}
              mode="compact2"
              unOccupiedText=""
              loadingStyle="skeleton"
            />
          ) : (
            <></>
          )
        }
      />
      <ContentWrapper>{renderHomePageForRole}</ContentWrapper>
    </>
  ) : (
    <></>
  );
};

export const HomePage = () => {
  const auth = useTypedSelector((state) => state.authReducer);
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
  } else if (roles.includes('idir')) {
    return <NewHomePage />;
  } else if (roles.includes('bceid')) {
    return <NewHomePage />;
  } else {
    return <UnauthorizedPage />;
  }
};
