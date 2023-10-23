import { registerEnumType } from '@nestjs/graphql';

export enum JobFamilyOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobFamilyOrderByRelevanceFieldEnum, {
  name: 'JobFamilyOrderByRelevanceFieldEnum',
  description: undefined,
});
