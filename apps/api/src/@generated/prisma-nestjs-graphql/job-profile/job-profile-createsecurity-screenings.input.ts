import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreatesecurity_screeningsInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
