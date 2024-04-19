import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationCreateManyClassificationInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
