import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
