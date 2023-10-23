import { registerEnumType } from '@nestjs/graphql';

export enum MinistryOrderByRelevanceFieldEnum {
  code = 'code',
  name = 'name',
}

registerEnumType(MinistryOrderByRelevanceFieldEnum, {
  name: 'MinistryOrderByRelevanceFieldEnum',
  description: undefined,
});
