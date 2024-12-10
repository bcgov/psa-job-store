/* eslint-disable @typescript-eslint/no-explicit-any */

export const getUserRoles = (user: Record<string, any> | null | undefined) => {
  // All users are assumed to have the 'user' pseudo-role
  // This role does not exist in keycloak, but is considered the default role
  return ['user', ...((user?.roles ?? []) as string[])];
};
