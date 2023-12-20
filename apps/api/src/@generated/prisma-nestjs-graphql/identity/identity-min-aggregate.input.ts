import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IdentityMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  sub?: true;

  @Field(() => Boolean, { nullable: true })
  identity_provider?: true;

  @Field(() => Boolean, { nullable: true })
  user_id?: true;

  @Field(() => Boolean, { nullable: true })
  created_at?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  deleted_at?: true;
}
