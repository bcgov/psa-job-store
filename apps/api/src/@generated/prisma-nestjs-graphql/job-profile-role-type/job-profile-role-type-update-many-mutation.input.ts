import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleTypeUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
