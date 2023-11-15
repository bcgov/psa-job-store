import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileReportsToOrderByRelevanceFieldEnum {
  classification_id = 'classification_id',
}

registerEnumType(JobProfileReportsToOrderByRelevanceFieldEnum, {
  name: 'JobProfileReportsToOrderByRelevanceFieldEnum',
  description: undefined,
});
