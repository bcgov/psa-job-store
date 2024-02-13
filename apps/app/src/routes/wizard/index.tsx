import { Outlet } from 'react-router-dom';
import { PositionProvider } from '../../components/app/common/contexts/position.context';

export const WizardRoute = () => {
  return (
    <div style={{ height: '100%' }}>
      <PositionProvider>
        <Outlet />
      </PositionProvider>
    </div>
  );
};
