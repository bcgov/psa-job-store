import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutIdentitiesNestedInput } from '../user/user-update-one-required-without-identities-nested.input';

@InputType()
export class IdentityUpdateInput {
  @Field(() => String, { nullable: true })
  sub?: string;

  @Field(() => String, { nullable: true })
  identity_provider?: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => UserUpdateOneRequiredWithoutIdentitiesNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutIdentitiesNestedInput;
}
