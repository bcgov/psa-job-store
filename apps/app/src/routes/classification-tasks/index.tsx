import { Outlet } from 'react-router-dom';
import { PositionProvider } from '../../components/app/common/contexts/position.context';

export const ClassificationTasksRoute = () => {
  return (
    <PositionProvider>
      <Outlet />
    </PositionProvider>
  );
};
