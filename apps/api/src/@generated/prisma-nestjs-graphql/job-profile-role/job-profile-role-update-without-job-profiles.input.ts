import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
