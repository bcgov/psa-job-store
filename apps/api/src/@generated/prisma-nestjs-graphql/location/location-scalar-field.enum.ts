import { registerEnumType } from '@nestjs/graphql';

export enum LocationScalarFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
  effective_date = 'effective_date',
}

registerEnumType(LocationScalarFieldEnum, { name: 'LocationScalarFieldEnum', description: undefined });
