import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UnassignUserRoleInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  role: string;
}
