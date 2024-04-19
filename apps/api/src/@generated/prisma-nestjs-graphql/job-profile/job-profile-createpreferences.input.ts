import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreatepreferencesInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
