import { User } from 'oidc-client-ts';
import { getUserRoles } from '../../../utils/get-user-roles.util';

export enum UserCanAccessMode {
  Every = 'every',
  Some = 'some',
}

export const userCanAccess = (
  user: User | null | undefined,
  roles: string[],
  mode: UserCanAccessMode = UserCanAccessMode.Some,
) => {
  return roles[mode]((role) => getUserRoles(user).includes(role));
};
