import { useAuth } from 'react-oidc-context';

import React from 'react';

const LoadingComponent = () => {
  return <></>;
};

const useRoleBasedComponent = (
  requiredRole: string,
  Component: React.ComponentType<unknown>,
  FallbackComponent: React.ComponentType<unknown>,
) => {
  const auth = useAuth();
  if (auth.isLoading) {
    return { component: LoadingComponent, loading: true };
  }

  const roles = auth.user?.profile['client_roles'] || [];

  // Check if the required role is included in the user's roles
  const hasRequiredRole = (roles as string[]).includes(requiredRole);

  // Return the appropriate component based on the role check
  return { component: hasRequiredRole ? Component : FallbackComponent, loading: false };
};

export const RoleBasedComponent = ({
  requiredRole,
  Component,
  FallbackComponent,
}: {
  requiredRole: string;
  Component: React.ComponentType<unknown>;
  FallbackComponent: React.ComponentType<unknown>;
}) => {
  const { component: ComponentToRender, loading } = useRoleBasedComponent(requiredRole, Component, FallbackComponent);

  // Render the component based on the current state
  if (loading) {
    return <LoadingComponent />;
  }

  return <ComponentToRender />;
};
