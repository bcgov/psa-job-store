import { registerEnumType } from '@nestjs/graphql';

export enum JobStream {
  CORPORATE = 'CORPORATE',
  MINISTRY = 'MINISTRY',
  USER = 'USER',
}

registerEnumType(JobStream, { name: 'JobStream', description: undefined });
