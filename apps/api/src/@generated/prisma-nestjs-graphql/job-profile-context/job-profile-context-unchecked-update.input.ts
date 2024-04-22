import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => String, { nullable: true })
  description?: string;
}
