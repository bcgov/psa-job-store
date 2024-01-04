import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationOrderByRelevanceFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
}

registerEnumType(ClassificationOrderByRelevanceFieldEnum, {
  name: 'ClassificationOrderByRelevanceFieldEnum',
  description: undefined,
});
