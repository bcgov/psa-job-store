import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
