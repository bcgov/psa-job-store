import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CareerGroupCreateWithoutProfilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
