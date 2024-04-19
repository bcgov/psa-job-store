import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleTypeUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
