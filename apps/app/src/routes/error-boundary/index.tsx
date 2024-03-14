import { Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export const ErrorBoundaryRoute = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
