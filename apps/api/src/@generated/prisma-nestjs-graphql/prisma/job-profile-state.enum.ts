import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

registerEnumType(JobProfileState, { name: 'JobProfileState', description: undefined });
