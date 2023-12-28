import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileStreamScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobProfileStreamScalarFieldEnum, { name: 'JobProfileStreamScalarFieldEnum', description: undefined });
