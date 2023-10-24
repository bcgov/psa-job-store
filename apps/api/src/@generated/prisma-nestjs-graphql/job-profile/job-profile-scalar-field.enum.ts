import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScalarFieldEnum {
  id = 'id',
  classification_id = 'classification_id',
  ministry_id = 'ministry_id',
  stream = 'stream',
  title = 'title',
  number = 'number',
  context = 'context',
  overview = 'overview',
}

registerEnumType(JobProfileScalarFieldEnum, { name: 'JobProfileScalarFieldEnum', description: undefined });
