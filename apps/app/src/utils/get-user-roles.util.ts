/* eslint-disable @typescript-eslint/no-explicit-any */

export const getUserRoles = (user: Record<string, any> | null | undefined) => {
  const roles: string[] = [];
  if ((user?.roles ?? []).includes('bceid')) {
    // If a user has the bceid role, they can _only_ act as a bceid user.  Ignore any other roles which may exist on the user
    roles.push('bceid');
  } else {
    // All IDIR users (users without the `bceid` role) are assumed to have the 'idir' pseudo-role
    // This role does not exist in keycloak, but is considered the default role
    roles.push('idir');

    // Apply the rest of the roles
    roles.push(...((user?.roles ?? []) as string[]));
  }

  return roles;
};
