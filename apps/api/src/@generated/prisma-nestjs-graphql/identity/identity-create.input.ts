import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutIdentitiesInput } from '../user/user-create-nested-one-without-identities.input';

@InputType()
export class IdentityCreateInput {
  @Field(() => String, { nullable: false })
  sub!: string;

  @Field(() => String, { nullable: false })
  identity_provider!: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => UserCreateNestedOneWithoutIdentitiesInput, { nullable: false })
  user!: UserCreateNestedOneWithoutIdentitiesInput;
}
