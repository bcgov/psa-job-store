import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AssignUserRolesInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => [String], { nullable: false })
  roles: string[];
}
