import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(OrganizationScalarFieldEnum, { name: 'OrganizationScalarFieldEnum', description: undefined });
