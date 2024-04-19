import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  requirement?: string;

  @Field(() => String, { nullable: true })
  grade?: string;
}
