import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationScalarFieldEnum {
  id = 'id',
  grid_id = 'grid_id',
  occupation_group_id = 'occupation_group_id',
}

registerEnumType(ClassificationScalarFieldEnum, { name: 'ClassificationScalarFieldEnum', description: undefined });
