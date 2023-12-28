import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileType {
  CORPORATE = 'CORPORATE',
  MINISTRY = 'MINISTRY',
  USER = 'USER',
}

registerEnumType(JobProfileType, { name: 'JobProfileType', description: undefined });
