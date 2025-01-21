import { Outlet } from 'react-router-dom';
import { TCProvider } from '../total-comp-create-profile/components/total-comp-create-profile.provider';

export const JobProfilesRoute = () => {
  return (
    <TCProvider>
      <Outlet />
    </TCProvider>
  );
};
