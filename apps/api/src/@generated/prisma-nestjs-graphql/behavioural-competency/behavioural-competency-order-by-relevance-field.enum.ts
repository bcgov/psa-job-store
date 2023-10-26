import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyOrderByRelevanceFieldEnum {
  name = 'name',
  description = 'description',
}

registerEnumType(BehaviouralCompetencyOrderByRelevanceFieldEnum, {
  name: 'BehaviouralCompetencyOrderByRelevanceFieldEnum',
  description: undefined,
});
