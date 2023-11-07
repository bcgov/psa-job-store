import { registerEnumType } from '@nestjs/graphql';

export enum CareerGroupScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(CareerGroupScalarFieldEnum, { name: 'CareerGroupScalarFieldEnum', description: undefined });
