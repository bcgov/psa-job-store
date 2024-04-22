import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeGroupUpdateWithoutClassificationsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
