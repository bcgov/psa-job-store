import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
