import { useAuth } from 'react-oidc-context';

export const useTestUser = () => {
  const auth = useAuth();
  const isTestUser = auth.user?.profile?.idir_username === 'TEST';

  return isTestUser;
};
