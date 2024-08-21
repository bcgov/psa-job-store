import { useAuth } from 'react-oidc-context';
import { getUserRoles } from '../../utils/get-user-roles.util';
import { ClassificationTasksPage } from '../classification-tasks/classification-tasks.page';
import { TotalCompDraftProfilesPage } from '../total-comp-draft-profiles/total-comp-draft-profies.page';
import { HomePage } from './home.page';

export const DynamicHomePage = () => {
  const auth = useAuth();
  const roles = getUserRoles(auth.user);

  if (roles.includes('super-admin')) {
    return <HomePage />;
  } else if (roles.includes('total-compensation')) {
    return <TotalCompDraftProfilesPage />;
  } else if (roles.includes('classification')) {
    return <ClassificationTasksPage />;
  } else if (roles.includes('hiring-manager')) {
    return <HomePage />;
  } else if (roles.includes('user')) {
    return <HomePage />;
  }
};
