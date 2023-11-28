import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyScalarFieldEnum {
  id = 'id',
  membership = 'membership',
  group = 'group',
  name = 'name',
  description = 'description',
}

registerEnumType(BehaviouralCompetencyScalarFieldEnum, {
  name: 'BehaviouralCompetencyScalarFieldEnum',
  description: undefined,
});
