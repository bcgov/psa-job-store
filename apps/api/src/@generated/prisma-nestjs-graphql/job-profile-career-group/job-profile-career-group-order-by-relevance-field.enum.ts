import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileCareerGroupOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobProfileCareerGroupOrderByRelevanceFieldEnum, {
  name: 'JobProfileCareerGroupOrderByRelevanceFieldEnum',
  description: undefined,
});
