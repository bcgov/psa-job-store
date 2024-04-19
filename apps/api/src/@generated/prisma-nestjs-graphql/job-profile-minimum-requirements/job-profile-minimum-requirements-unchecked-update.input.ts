import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  requirement?: string;

  @Field(() => String, { nullable: true })
  grade?: string;
}
