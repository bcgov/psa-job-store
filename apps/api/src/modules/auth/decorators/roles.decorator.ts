import { SetMetadata } from '@nestjs/common';

export const ROLES = 'ROLES';

export enum RoleMatchingMode {
  ALL = 'all',
  ANY = 'any',
}

export const Roles = (...args: string[]) => SetMetadata(ROLES, args);
