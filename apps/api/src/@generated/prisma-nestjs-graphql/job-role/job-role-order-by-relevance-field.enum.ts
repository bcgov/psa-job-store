import { registerEnumType } from '@nestjs/graphql';

export enum JobRoleOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobRoleOrderByRelevanceFieldEnum, {
  name: 'JobRoleOrderByRelevanceFieldEnum',
  description: undefined,
});
