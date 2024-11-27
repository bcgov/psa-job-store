import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';
import { useAppDispatch } from '../../redux/redux.store';
import { setUser } from '../../routes/auth/store/auth.slice';

export const NextRouteGuard = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      (async () => {
        const response = await fetch('http://localhost:3000/api/auth/user');
        if (!response.ok) {
          navigate('/auth/login');
        } else {
          dispatch(setUser(response.json()));
          navigate('/');
        }
      })();
    }
  }, [dispatch, navigate, auth]);

  return (
    <>
      <span>NextRouteGuard</span>
      <br />
      {JSON.stringify(auth, undefined, 2)}
      <br />
      <Outlet />
    </>
  );
};
