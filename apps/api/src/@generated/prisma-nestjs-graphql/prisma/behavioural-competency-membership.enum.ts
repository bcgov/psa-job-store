import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyMembership {
  EXCLUDED = 'EXCLUDED',
  INCLUDED = 'INCLUDED',
  INDIGENOUS = 'INDIGENOUS',
}

registerEnumType(BehaviouralCompetencyMembership, { name: 'BehaviouralCompetencyMembership', description: undefined });
