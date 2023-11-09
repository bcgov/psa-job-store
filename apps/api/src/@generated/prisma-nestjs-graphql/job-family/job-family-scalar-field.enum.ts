import { registerEnumType } from '@nestjs/graphql';

export enum JobFamilyScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobFamilyScalarFieldEnum, { name: 'JobFamilyScalarFieldEnum', description: undefined });
