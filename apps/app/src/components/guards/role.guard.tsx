import React from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredRole }) => {
  const auth = useAuth();
  const roles = auth.user?.profile['client_roles'] || [];

  return (roles as string[]).includes(requiredRole) ? children : <Navigate to="/unauthorized" />;
};

export default RoleGuard;
