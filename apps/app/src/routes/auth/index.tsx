import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';

export const AuthRoute = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  if (auth.isAuthenticated) {
    return <Navigate replace to="/" />;
  } else {
    return <Outlet />;
  }
};
