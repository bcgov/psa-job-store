import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileClassificationOrderByRelevanceFieldEnum {
  classification_id = 'classification_id',
}

registerEnumType(JobProfileClassificationOrderByRelevanceFieldEnum, {
  name: 'JobProfileClassificationOrderByRelevanceFieldEnum',
  description: undefined,
});
