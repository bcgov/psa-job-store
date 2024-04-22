import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreatewillingness_statementsInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
