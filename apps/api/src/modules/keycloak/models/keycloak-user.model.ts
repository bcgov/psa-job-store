import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KeycloakUserAttributes {
  @Field(() => [String], { nullable: false })
  idir_user_guid: string[];

  @Field(() => [String], { nullable: false })
  idir_username: string[];

  @Field(() => [String], { nullable: false })
  display_name: string[];
}

@ObjectType()
export class KeycloakUser {
  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => KeycloakUserAttributes)
  attributes: KeycloakUserAttributes;
}
