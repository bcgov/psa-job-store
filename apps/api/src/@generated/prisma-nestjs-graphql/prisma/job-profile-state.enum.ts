import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileState {
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(JobProfileState, { name: 'JobProfileState', description: undefined });
