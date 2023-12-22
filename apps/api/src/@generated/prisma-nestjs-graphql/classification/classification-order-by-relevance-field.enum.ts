import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationOrderByRelevanceFieldEnum {
  id = 'id',
  code = 'code',
  name = 'name',
}

registerEnumType(ClassificationOrderByRelevanceFieldEnum, {
  name: 'ClassificationOrderByRelevanceFieldEnum',
  description: undefined,
});
