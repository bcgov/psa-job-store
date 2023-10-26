import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScalarFieldEnum {
  id = 'id',
  category_id = 'category_id',
  classification_id = 'classification_id',
  family_id = 'family_id',
  ministry_id = 'ministry_id',
  role_id = 'role_id',
  stream = 'stream',
  title = 'title',
  number = 'number',
  context = 'context',
  overview = 'overview',
  accountabilities_required = 'accountabilities_required',
  accountabilities_optional = 'accountabilities_optional',
  requirements = 'requirements',
}

registerEnumType(JobProfileScalarFieldEnum, { name: 'JobProfileScalarFieldEnum', description: undefined });
