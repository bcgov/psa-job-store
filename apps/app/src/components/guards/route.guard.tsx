import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';

export const RouteGuard = () => {
  const auth = useTypedSelector((state) => state.authReducer);
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
