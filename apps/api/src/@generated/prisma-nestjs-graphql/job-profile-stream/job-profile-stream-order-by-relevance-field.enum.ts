import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileStreamOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(JobProfileStreamOrderByRelevanceFieldEnum, {
  name: 'JobProfileStreamOrderByRelevanceFieldEnum',
  description: undefined,
});
