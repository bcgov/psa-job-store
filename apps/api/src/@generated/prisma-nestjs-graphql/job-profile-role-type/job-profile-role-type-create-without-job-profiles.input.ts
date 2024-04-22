import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleTypeCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
