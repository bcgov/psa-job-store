import { useAuth } from 'react-oidc-context';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute = () => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
};
