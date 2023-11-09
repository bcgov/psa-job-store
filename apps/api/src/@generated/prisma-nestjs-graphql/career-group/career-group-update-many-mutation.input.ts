import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CareerGroupUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
