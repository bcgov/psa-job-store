import { User } from 'oidc-client-ts';

export const getUserRoles = (user: User | null | undefined) => {
  // All users are assumed to have the 'user' pseudo-role
  // This role does not exist in keycloak, but is considered the default role
  return ['user', ...((user?.profile['client_roles'] ?? []) as string[])];
};
