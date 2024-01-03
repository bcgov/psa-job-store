import { Outlet } from 'react-router-dom';
import { WizardProvider } from '../wizard/components/wizard.provider';

export const MyPositionsRoute = () => {
  return (
    <WizardProvider>
      <Outlet />
    </WizardProvider>
  );
};
