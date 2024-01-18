import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileRoleTypeOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobProfileRoleTypeOrderByRelevanceFieldEnum, {
  name: 'JobProfileRoleTypeOrderByRelevanceFieldEnum',
  description: undefined,
});
