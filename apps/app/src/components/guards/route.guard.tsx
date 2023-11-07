import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const RouteGuard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        sessionStorage.removeItem('redirectPath');
      }
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated && !auth.isLoading) {
    if (!sessionStorage.getItem('redirectPath')) {
      const currentPath = window.location.pathname + window.location.search;
      sessionStorage.setItem('redirectPath', currentPath);
    }
    return <Navigate replace to="/auth/login" />;
  }

  return <Outlet />;
};
