import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  role_id?: true;

  @Field(() => Boolean, { nullable: true })
  role_type_id?: true;

  @Field(() => Boolean, { nullable: true })
  scope_id?: true;

  @Field(() => Boolean, { nullable: true })
  number?: true;
}
