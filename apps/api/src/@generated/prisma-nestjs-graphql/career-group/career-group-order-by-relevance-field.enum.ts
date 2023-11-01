import { registerEnumType } from '@nestjs/graphql';

export enum CareerGroupOrderByRelevanceFieldEnum {
  name = 'name',
}

registerEnumType(CareerGroupOrderByRelevanceFieldEnum, {
  name: 'CareerGroupOrderByRelevanceFieldEnum',
  description: undefined,
});
