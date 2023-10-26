import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreateaccountabilities_optionalInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
