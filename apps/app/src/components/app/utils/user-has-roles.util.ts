/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserRoles } from '../../../utils/get-user-roles.util';

export enum UserCanAccessMode {
  Every = 'every',
  Some = 'some',
}

export const userCanAccess = (
  user: Record<string, any> | null | undefined,
  roles: string[],
  mode: UserCanAccessMode = UserCanAccessMode.Some,
) => {
  return roles[mode]((role) => getUserRoles(user).includes(role));
};
