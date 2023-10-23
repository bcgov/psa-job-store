import { registerEnumType } from '@nestjs/graphql';

export enum OccupationGroupScalarFieldEnum {
  id = 'id',
  code = 'code',
  name = 'name',
}

registerEnumType(OccupationGroupScalarFieldEnum, { name: 'OccupationGroupScalarFieldEnum', description: undefined });
