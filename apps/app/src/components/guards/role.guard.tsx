import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';
import LoadingSpinnerWithMessage from '../app/common/components/loading.component';

interface RoleGuardProps {
  children: React.ReactNode;
  roles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, roles }) => {
  const auth = useTypedSelector((state) => state.authReducer);

  if (auth.isLoading) {
    // Render a loading indicator or any appropriate content while loading
    return <LoadingSpinnerWithMessage />;
  }

  if (!auth.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  const userRoles = (auth.user?.roles as string[]) || [];

  if (!roles.some((role) => userRoles.includes(role))) {
    // Redirect to unauthorized if the user does not have the required role
    return <Navigate to="/unauthorized" />;
  }

  // Render children if authenticated, not loading, and has the required role
  return <>{children}</>;
};

export default RoleGuard;
