import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileRoleOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobProfileRoleOrderByRelevanceFieldEnum, {
  name: 'JobProfileRoleOrderByRelevanceFieldEnum',
  description: undefined,
});
