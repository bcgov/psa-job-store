import { Outlet } from 'react-router-dom';
import { SettingsProvider } from './components/settings.provider';

export const SettingsRoute = () => {
  return (
    <SettingsProvider>
      <Outlet />
    </SettingsProvider>
  );
};
