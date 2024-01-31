import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreateknowledge_skills_abilitiesInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
