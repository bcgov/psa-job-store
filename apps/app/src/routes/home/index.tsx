import { Outlet } from 'react-router-dom';
import { PositionProvider } from '../../components/app/common/contexts/position.context';

export const HomeRoute = () => {
  return (
    <PositionProvider>
      <Outlet />
    </PositionProvider>
  );
};
