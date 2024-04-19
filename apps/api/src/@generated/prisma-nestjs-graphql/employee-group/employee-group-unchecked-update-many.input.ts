import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeGroupUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
