import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  peoplesoft_id?: true;

  @Field(() => Boolean, { nullable: true })
  code?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  effective_status?: true;

  @Field(() => Boolean, { nullable: true })
  effective_date?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
