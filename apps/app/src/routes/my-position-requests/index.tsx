import { Outlet } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { PositionProvider } from '../../components/app/common/contexts/position.context';

export const MyPositionsRoute = () => {
  return (
    <ReactFlowProvider>
      <PositionProvider>
        <Outlet />
      </PositionProvider>
    </ReactFlowProvider>
  );
};
