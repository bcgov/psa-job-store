import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileContextOrderByRelevanceFieldEnum {
  description = 'description',
}

registerEnumType(JobProfileContextOrderByRelevanceFieldEnum, {
  name: 'JobProfileContextOrderByRelevanceFieldEnum',
  description: undefined,
});
