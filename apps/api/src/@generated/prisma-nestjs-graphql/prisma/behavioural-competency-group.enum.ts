import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyGroup {
  ACHIEVING_BUSINESS_RESULTS = 'ACHIEVING_BUSINESS_RESULTS',
  INTERPERSONAL_RELATIONSHIPS = 'INTERPERSONAL_RELATIONSHIPS',
  LEADING_PEOPLE = 'LEADING_PEOPLE',
  PERSONAL_EFFECTIVENESS = 'PERSONAL_EFFECTIVENESS',
}

registerEnumType(BehaviouralCompetencyGroup, { name: 'BehaviouralCompetencyGroup', description: undefined });
