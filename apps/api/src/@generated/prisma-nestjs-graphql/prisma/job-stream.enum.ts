import { registerEnumType } from '@nestjs/graphql';

export enum JobStream {
  CORPORATE = 'CORPORATE',
  MINISTRY = 'MINISTRY',
}

registerEnumType(JobStream, { name: 'JobStream', description: undefined });
