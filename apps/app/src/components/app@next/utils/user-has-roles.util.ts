import { User } from 'oidc-client-ts';

export enum UserCanAccessMode {
  Every = 'every',
  Some = 'some',
}

export const userCanAccess = (
  user: User | null | undefined,
  roles: string[],
  mode: UserCanAccessMode = UserCanAccessMode.Some,
) => {
  return roles[mode]((role) => ((user?.profile['client_roles'] ?? []) as string[]).includes(role));
};
