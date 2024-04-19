import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeGroupCreateWithoutClassificationsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;
}
