import { Outlet } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

export const PositionRoute = () => {
  return (
    <ReactFlowProvider>
      <Outlet />
    </ReactFlowProvider>
  );
};
