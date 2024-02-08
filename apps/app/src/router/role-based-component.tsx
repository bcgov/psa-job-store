import { useAuth } from 'react-oidc-context';
import LoadingSpinnerWithMessage from '../components/app/common/components/loading.component';

// Define a type for the role to component mapping
type RoleComponentMapping = {
  [role: string]: React.ComponentType<unknown>;
};

// RoleBasedRouting component now accepts a roleComponentMapping prop
export const RoleBasedRouting = ({ roleComponentMapping }: { roleComponentMapping: RoleComponentMapping }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <LoadingSpinnerWithMessage />;
  }

  const roles = auth.user?.profile['client_roles'] || [];
  let ComponentToRender = roleComponentMapping['default']; // Default component if no roles match

  // Check roles in priority order
  for (const role of roles as string[]) {
    if (roleComponentMapping[role]) {
      ComponentToRender = roleComponentMapping[role];
      break; // Stop checking if a matching role is found
    }
  }

  return <ComponentToRender />;
};
