import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

registerEnumType(JobProfileState, { name: 'JobProfileState', description: undefined });
