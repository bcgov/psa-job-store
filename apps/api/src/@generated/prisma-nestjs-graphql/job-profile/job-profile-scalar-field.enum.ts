import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScalarFieldEnum {
  id = 'id',
  category_id = 'category_id',
  classification_id = 'classification_id',
  family_id = 'family_id',
  ministry_id = 'ministry_id',
  owner_id = 'owner_id',
  parent_id = 'parent_id',
  role_id = 'role_id',
  state = 'state',
  stream = 'stream',
  title = 'title',
  number = 'number',
  context = 'context',
  overview = 'overview',
  accountabilities = 'accountabilities',
  requirements = 'requirements',
}

registerEnumType(JobProfileScalarFieldEnum, { name: 'JobProfileScalarFieldEnum', description: undefined });
