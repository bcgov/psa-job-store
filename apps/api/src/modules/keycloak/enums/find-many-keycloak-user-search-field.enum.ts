import { registerEnumType } from '@nestjs/graphql';

export enum FindManyKeycloakUserSearchField {
  GUID = 'guid',
  EMAIL = 'email',
}

registerEnumType(FindManyKeycloakUserSearchField, { name: 'FindManyKeycloakUserSearchField', description: undefined });
