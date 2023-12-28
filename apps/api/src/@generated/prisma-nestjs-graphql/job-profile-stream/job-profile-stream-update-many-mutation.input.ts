import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
