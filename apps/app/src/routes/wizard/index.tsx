import { Outlet } from 'react-router-dom';
import { WizardProvider } from './components/wizard.provider';

export const WizardRoute = () => {
  return (
    <div>
      <WizardProvider>
        <Outlet />
      </WizardProvider>
    </div>
  );
};
