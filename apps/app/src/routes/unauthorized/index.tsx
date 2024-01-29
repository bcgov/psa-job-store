import { Outlet } from 'react-router-dom';

export const UnauthorizedRoute = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
