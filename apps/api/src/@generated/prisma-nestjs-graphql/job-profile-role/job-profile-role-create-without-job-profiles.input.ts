import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
