import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileOrderByRelevanceFieldEnum {
  classification_id = 'classification_id',
  organization_id = 'organization_id',
  owner_id = 'owner_id',
  title = 'title',
  context = 'context',
  overview = 'overview',
  requirements = 'requirements',
}

registerEnumType(JobProfileOrderByRelevanceFieldEnum, {
  name: 'JobProfileOrderByRelevanceFieldEnum',
  description: undefined,
});
