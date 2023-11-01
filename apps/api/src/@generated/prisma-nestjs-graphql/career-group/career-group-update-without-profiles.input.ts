import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CareerGroupUpdateWithoutProfilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
