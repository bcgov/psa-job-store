import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  classification_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
