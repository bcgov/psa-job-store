import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  email?: true;

  @Field(() => Boolean, { nullable: true })
  created_at?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  deleted_at?: true;
}
