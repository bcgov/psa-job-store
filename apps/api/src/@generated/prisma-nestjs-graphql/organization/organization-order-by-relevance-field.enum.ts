import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationOrderByRelevanceFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(OrganizationOrderByRelevanceFieldEnum, {
  name: 'OrganizationOrderByRelevanceFieldEnum',
  description: undefined,
});
