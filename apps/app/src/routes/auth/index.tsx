import { notification } from 'antd';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';

export const AuthRoute = () => {
  const [api, contextHolder] = notification.useNotification();

  const auth = useTypedSelector((state) => state.authReducer);
  const location = useLocation();

  useEffect(() => {
    const openNotification = () => {
      console.log('opennotifi');
      api.error({
        key: 'unauthorized',
        message: 'Unauthorized',
        description:
          'You are not permitted to access the Job Store.  If you think this is in error, please email jobstore@gov.bc.ca.',
      });
    };

    if (location.search.includes('error=unauthorized')) {
      openNotification();
    }
  }, [location]);

  if (auth.isAuthenticated) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        {contextHolder}
        <Outlet />
      </>
    );
  }
};
