import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreateaccountabilities_requiredInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
