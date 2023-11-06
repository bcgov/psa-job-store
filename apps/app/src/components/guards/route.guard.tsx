import { useEffect, useRef } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const RouteGuard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const redirectDoneRef = useRef(false); // this is for double rendering in debug mode due to strict mode

  useEffect(() => {
    if (auth.isAuthenticated && !redirectDoneRef.current) {
      const redirectPath = sessionStorage.getItem('redirectPath') || '/';
      navigate(redirectPath, { replace: true });
      sessionStorage.removeItem('redirectPath');
      redirectDoneRef.current = true;
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated && !auth.isLoading) {
    const currentPath = window.location.pathname;
    sessionStorage.setItem('redirectPath', currentPath);
    return <Navigate replace to="/auth/login" />;
  }

  return <Outlet />;
};
