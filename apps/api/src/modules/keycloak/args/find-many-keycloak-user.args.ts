import { ArgsType, Field } from '@nestjs/graphql';
import { FindManyKeycloakUserIdp } from '../enums/find-many-keycloak-user-idp.enum';
import { FindManyKeycloakUserSearchField } from '../enums/find-many-keycloak-user-search-field.enum';

@ArgsType()
export class FindManyKeycloakUserArgs {
  @Field(() => FindManyKeycloakUserIdp, { nullable: false })
  idp: keyof typeof FindManyKeycloakUserIdp;

  @Field(() => FindManyKeycloakUserSearchField, { nullable: false })
  field: keyof typeof FindManyKeycloakUserSearchField;

  @Field(() => String, { nullable: false })
  value: string;
}
