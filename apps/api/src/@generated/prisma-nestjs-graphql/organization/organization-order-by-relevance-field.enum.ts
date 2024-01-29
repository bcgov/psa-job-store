import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationOrderByRelevanceFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
}

registerEnumType(OrganizationOrderByRelevanceFieldEnum, {
  name: 'OrganizationOrderByRelevanceFieldEnum',
  description: undefined,
});
