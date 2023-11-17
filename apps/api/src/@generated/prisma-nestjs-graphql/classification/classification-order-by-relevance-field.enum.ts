import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationOrderByRelevanceFieldEnum {
  id = 'id',
  code = 'code',
}

registerEnumType(ClassificationOrderByRelevanceFieldEnum, {
  name: 'ClassificationOrderByRelevanceFieldEnum',
  description: undefined,
});
