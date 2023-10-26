import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileOrderByRelevanceFieldEnum {
  title = 'title',
  context = 'context',
  overview = 'overview',
  accountabilities_required = 'accountabilities_required',
  accountabilities_optional = 'accountabilities_optional',
  requirements = 'requirements',
}

registerEnumType(JobProfileOrderByRelevanceFieldEnum, {
  name: 'JobProfileOrderByRelevanceFieldEnum',
  description: undefined,
});
