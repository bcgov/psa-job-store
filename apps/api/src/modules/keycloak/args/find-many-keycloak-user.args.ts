import { ArgsType, Field } from '@nestjs/graphql';
import { FindManyKeycloakUserSearchField } from '../enums/find-many-keycloak-user-search-field.enum';

@ArgsType()
export class FindManyKeycloakUserArgs {
  @Field(() => FindManyKeycloakUserSearchField, { nullable: false })
  field: keyof typeof FindManyKeycloakUserSearchField;

  @Field(() => String, { nullable: false })
  value: string;
}
