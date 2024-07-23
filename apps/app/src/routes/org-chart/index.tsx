import { Outlet } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

export const OrgChartRoute = () => {
  return (
    <ReactFlowProvider>
      <Outlet />
    </ReactFlowProvider>
  );
};
