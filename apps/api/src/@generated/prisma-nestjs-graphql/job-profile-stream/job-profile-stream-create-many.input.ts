import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamCreateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => String, { nullable: false })
  name!: string;
}
