import { registerEnumType } from '@nestjs/graphql';

export enum GridScalarFieldEnum {
  id = 'id',
  name = 'name',
  steps = 'steps',
}

registerEnumType(GridScalarFieldEnum, { name: 'GridScalarFieldEnum', description: undefined });
