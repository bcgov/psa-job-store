import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedCreateWithoutClassificationInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
