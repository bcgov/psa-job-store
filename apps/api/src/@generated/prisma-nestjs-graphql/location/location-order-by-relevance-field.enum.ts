import { registerEnumType } from '@nestjs/graphql';

export enum LocationOrderByRelevanceFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
}

registerEnumType(LocationOrderByRelevanceFieldEnum, {
  name: 'LocationOrderByRelevanceFieldEnum',
  description: undefined,
});
