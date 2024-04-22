import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedUpdateManyWithoutClassificationInput {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
