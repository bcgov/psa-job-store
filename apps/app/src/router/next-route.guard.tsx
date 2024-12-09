import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../redux/redux.hooks';
import { useAppDispatch } from '../redux/redux.store';
import { setUser } from '../routes/auth/store/auth.slice';

export const NextRouteGuard = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      (async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, { credentials: 'include' });
          if (!response.ok) {
            setIsLoading(false);
            navigate('/auth/login');
          } else {
            const json = await response.json();
            dispatch(setUser(json));
            setIsLoading(false);
            navigate(location.pathname);
          }
        } catch (error) {
          setIsLoading(false);
          navigate('/auth/login');
        }
      })();
    }
  }, [dispatch, location.pathname, navigate, auth]);

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin spinning={isLoading} />
      </div>
    );
  } else {
    return <Outlet />;
  }
};
