import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';

export const RootRoute = () => {
  const auth = useTypedSelector((state) => state.authReducer);

  useEffect(() => {
    console.log('RootRoute: ', auth);
  }, [auth]);

  return <Outlet />;
};
