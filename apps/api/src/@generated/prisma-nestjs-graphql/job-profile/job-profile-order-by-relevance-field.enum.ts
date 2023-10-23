import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileOrderByRelevanceFieldEnum {
  title = 'title',
  context = 'context',
  overview = 'overview',
}

registerEnumType(JobProfileOrderByRelevanceFieldEnum, {
  name: 'JobProfileOrderByRelevanceFieldEnum',
  description: undefined,
});
