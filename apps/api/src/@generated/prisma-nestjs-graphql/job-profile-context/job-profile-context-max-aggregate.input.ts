import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;
}
