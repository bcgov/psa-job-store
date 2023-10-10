import { useAuth } from 'react-oidc-context';
import { Navigate, Outlet } from 'react-router-dom';

export const RouteGuard = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated && !auth.isLoading) {
    return <Navigate replace to="auth/login" />;
  }

  return <Outlet />;
};
