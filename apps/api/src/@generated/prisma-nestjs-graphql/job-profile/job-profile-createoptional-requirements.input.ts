import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreateoptional_requirementsInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
