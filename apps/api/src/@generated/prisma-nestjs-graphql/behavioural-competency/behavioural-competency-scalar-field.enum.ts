import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyScalarFieldEnum {
  id = 'id',
  name = 'name',
  description = 'description',
}

registerEnumType(BehaviouralCompetencyScalarFieldEnum, {
  name: 'BehaviouralCompetencyScalarFieldEnum',
  description: undefined,
});
