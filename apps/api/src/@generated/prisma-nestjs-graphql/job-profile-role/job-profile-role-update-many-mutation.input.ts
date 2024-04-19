import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
