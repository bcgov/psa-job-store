import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
