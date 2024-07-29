import { registerEnumType } from '@nestjs/graphql';

export enum FindManyKeycloakUserSearchField {
  email = 'email',
  firstName = 'firstName',
  guid = 'guid',
  lastName = 'lastName',
}

registerEnumType(FindManyKeycloakUserSearchField, { name: 'FindManyKeycloakUserSearchField', description: undefined });
