import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileJobFamilyOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobProfileJobFamilyOrderByRelevanceFieldEnum, {
  name: 'JobProfileJobFamilyOrderByRelevanceFieldEnum',
  description: undefined,
});
