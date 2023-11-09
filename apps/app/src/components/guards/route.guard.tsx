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
        navigate(decodeURIComponent(redirectPath), { replace: true });
        sessionStorage.removeItem('redirectPath');
      }
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated && !auth.isLoading) {
    if (!sessionStorage.getItem('redirectPath')) {
      const currentUrl = new URL(window.location.href);
      const currentPath = currentUrl.pathname + currentUrl.search;
      sessionStorage.setItem('redirectPath', encodeURIComponent(currentPath));
    }
    return <Navigate replace to="/auth/login" />;
  }

  return <Outlet />;
};
