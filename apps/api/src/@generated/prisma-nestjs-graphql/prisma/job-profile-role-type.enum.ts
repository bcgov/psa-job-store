import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileRoleType {
  SUPERVISORY = 'SUPERVISORY',
  NON_SUPERVISORY = 'NON_SUPERVISORY',
}

registerEnumType(JobProfileRoleType, { name: 'JobProfileRoleType', description: undefined });
