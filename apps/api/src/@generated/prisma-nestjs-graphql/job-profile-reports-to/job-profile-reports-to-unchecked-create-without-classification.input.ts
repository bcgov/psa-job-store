import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedCreateWithoutClassificationInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
