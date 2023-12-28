import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCareerGroupUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
