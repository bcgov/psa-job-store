import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileType {
  CORPORATE = 'CORPORATE',
  MINISTRY = 'MINISTRY',
}

registerEnumType(JobProfileType, { name: 'JobProfileType', description: undefined });
