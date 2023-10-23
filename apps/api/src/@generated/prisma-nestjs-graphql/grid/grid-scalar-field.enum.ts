import { registerEnumType } from '@nestjs/graphql';

export enum GridScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(GridScalarFieldEnum, { name: 'GridScalarFieldEnum', description: undefined });
