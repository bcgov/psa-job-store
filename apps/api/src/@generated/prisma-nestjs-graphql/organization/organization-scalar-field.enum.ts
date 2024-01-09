import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationScalarFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
  effective_date = 'effective_date',
}

registerEnumType(OrganizationScalarFieldEnum, { name: 'OrganizationScalarFieldEnum', description: undefined });
