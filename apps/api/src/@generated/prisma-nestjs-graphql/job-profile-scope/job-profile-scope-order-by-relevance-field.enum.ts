import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScopeOrderByRelevanceFieldEnum {
  name = 'name',
  description = 'description',
}

registerEnumType(JobProfileScopeOrderByRelevanceFieldEnum, {
  name: 'JobProfileScopeOrderByRelevanceFieldEnum',
  description: undefined,
});
