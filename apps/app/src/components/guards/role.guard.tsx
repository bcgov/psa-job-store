import React from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredRole }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    // Render a loading indicator or any appropriate content while loading
    return <>Loading...</>;
  }

  if (!auth.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  const roles = auth.user?.profile['client_roles'] || [];

  if (!(roles as string[]).includes(requiredRole)) {
    // Redirect to unauthorized if the user does not have the required role
    return <Navigate to="/unauthorized" />;
  }

  // Render children if authenticated, not loading, and has the required role
  return <>{children}</>;
};

export default RoleGuard;
