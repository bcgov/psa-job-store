import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => String, { nullable: false })
  description!: string;
}
