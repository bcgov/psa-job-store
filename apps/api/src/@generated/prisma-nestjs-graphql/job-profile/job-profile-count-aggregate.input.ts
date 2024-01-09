import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  career_group_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_family_id?: true;

  @Field(() => Boolean, { nullable: true })
  role_id?: true;

  @Field(() => Boolean, { nullable: true })
  state?: true;

  @Field(() => Boolean, { nullable: true })
  stream_id?: true;

  @Field(() => Boolean, { nullable: true })
  type?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  owner_id?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  number?: true;

  @Field(() => Boolean, { nullable: true })
  overview?: true;

  @Field(() => Boolean, { nullable: true })
  accountabilities?: true;

  @Field(() => Boolean, { nullable: true })
  requirements?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
