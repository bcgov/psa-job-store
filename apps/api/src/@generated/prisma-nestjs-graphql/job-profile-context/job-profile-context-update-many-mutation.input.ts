import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  description?: string;
}
