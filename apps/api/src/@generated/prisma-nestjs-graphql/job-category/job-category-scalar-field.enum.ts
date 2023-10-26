import { registerEnumType } from '@nestjs/graphql';

export enum JobCategoryScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobCategoryScalarFieldEnum, { name: 'JobCategoryScalarFieldEnum', description: undefined });
