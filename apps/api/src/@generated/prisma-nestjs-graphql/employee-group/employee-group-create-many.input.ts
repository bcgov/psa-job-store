import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeGroupCreateManyInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;
}
