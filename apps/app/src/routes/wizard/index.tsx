import { Outlet } from 'react-router-dom';
import { PositionProvider } from '../../components/app/common/contexts/position.context';
import { JobProfilesProvider } from '../job-profiles/components/job-profiles.context';

export const WizardRoute = () => {
  return (
    <PositionProvider>
      <JobProfilesProvider>
        <Outlet />
      </JobProfilesProvider>
    </PositionProvider>
  );
};
