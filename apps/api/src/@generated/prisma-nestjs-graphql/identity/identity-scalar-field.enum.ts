import { registerEnumType } from '@nestjs/graphql';

export enum IdentityScalarFieldEnum {
  sub = 'sub',
  identity_provider = 'identity_provider',
  user_id = 'user_id',
  created_at = 'created_at',
  updated_at = 'updated_at',
  deleted_at = 'deleted_at',
}

registerEnumType(IdentityScalarFieldEnum, { name: 'IdentityScalarFieldEnum', description: undefined });
