import { registerEnumType } from '@nestjs/graphql';

export enum OccupationGroupOrderByRelevanceFieldEnum {
  code = 'code',
  name = 'name',
}

registerEnumType(OccupationGroupOrderByRelevanceFieldEnum, {
  name: 'OccupationGroupOrderByRelevanceFieldEnum',
  description: undefined,
});
