import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileMinimumRequirementsOrderByRelevanceFieldEnum {
  requirement = 'requirement',
  grade = 'grade',
}

registerEnumType(JobProfileMinimumRequirementsOrderByRelevanceFieldEnum, {
  name: 'JobProfileMinimumRequirementsOrderByRelevanceFieldEnum',
  description: undefined,
});
