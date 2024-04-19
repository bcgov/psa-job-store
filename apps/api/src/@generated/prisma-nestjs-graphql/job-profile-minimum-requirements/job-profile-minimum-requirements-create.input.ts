import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsCreateInput {
  @Field(() => String, { nullable: false })
  requirement!: string;

  @Field(() => String, { nullable: false })
  grade!: string;
}
