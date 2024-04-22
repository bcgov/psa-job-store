import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  classification_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
