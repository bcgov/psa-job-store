import { useTypedSelector } from '../redux/redux.hooks';

export const useTestUser = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const isTestUser = auth.user?.username === 'TESTINGUSER';

  return isTestUser;
};
