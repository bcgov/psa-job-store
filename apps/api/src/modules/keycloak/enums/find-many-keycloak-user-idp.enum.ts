import { registerEnumType } from '@nestjs/graphql';

export enum FindManyKeycloakUserIdp {
  IDIR = 'idir',
}

registerEnumType(FindManyKeycloakUserIdp, { name: 'FindManyKeycloakUserIdp', description: undefined });
