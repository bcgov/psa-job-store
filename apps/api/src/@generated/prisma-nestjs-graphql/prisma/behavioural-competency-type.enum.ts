import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyType {
  EXCLUDED = 'EXCLUDED',
  INCLUDED = 'INCLUDED',
  INDIGENOUS = 'INDIGENOUS',
}

registerEnumType(BehaviouralCompetencyType, { name: 'BehaviouralCompetencyType', description: undefined });
