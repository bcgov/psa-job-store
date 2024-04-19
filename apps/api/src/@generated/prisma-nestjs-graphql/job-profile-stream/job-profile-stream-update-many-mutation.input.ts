import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
