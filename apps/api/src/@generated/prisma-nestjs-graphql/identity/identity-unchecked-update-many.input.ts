import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IdentityUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  sub?: string;

  @Field(() => String, { nullable: true })
  identity_provider?: string;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;
}
