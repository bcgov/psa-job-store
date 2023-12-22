import { registerEnumType } from '@nestjs/graphql';

export enum JobStream {
  CORPORATE = 'CORPORATE',
  ORGANIZATION = 'ORGANIZATION',
  USER = 'USER',
}

registerEnumType(JobStream, { name: 'JobStream', description: undefined });
