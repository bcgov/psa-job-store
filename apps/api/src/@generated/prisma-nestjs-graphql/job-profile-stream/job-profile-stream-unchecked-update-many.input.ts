import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_family_id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
