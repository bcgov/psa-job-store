import { registerEnumType } from '@nestjs/graphql';

export enum JobCategoryOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobCategoryOrderByRelevanceFieldEnum, {
  name: 'JobCategoryOrderByRelevanceFieldEnum',
  description: undefined,
});
