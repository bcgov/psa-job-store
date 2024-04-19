import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  requirement!: string;

  @Field(() => String, { nullable: false })
  grade!: string;
}
