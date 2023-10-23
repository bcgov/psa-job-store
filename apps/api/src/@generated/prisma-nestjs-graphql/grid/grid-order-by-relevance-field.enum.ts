import { registerEnumType } from '@nestjs/graphql';

export enum GridOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(GridOrderByRelevanceFieldEnum, { name: 'GridOrderByRelevanceFieldEnum', description: undefined });
