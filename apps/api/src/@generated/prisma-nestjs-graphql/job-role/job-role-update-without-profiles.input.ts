import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobRoleUpdateWithoutProfilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
