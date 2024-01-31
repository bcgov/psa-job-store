import { registerEnumType } from '@nestjs/graphql';

export enum BehaviouralCompetencyScalarFieldEnum {
  id = 'id',
  type = 'type',
  category = 'category',
  name = 'name',
  description = 'description',
}

registerEnumType(BehaviouralCompetencyScalarFieldEnum, {
  name: 'BehaviouralCompetencyScalarFieldEnum',
  description: undefined,
});
