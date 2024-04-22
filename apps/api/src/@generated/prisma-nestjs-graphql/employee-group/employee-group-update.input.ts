import { Field, InputType } from '@nestjs/graphql';
import { ClassificationUpdateManyWithoutEmployee_groupNestedInput } from '../classification/classification-update-many-without-employee-group-nested.input';

@InputType()
export class EmployeeGroupUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ClassificationUpdateManyWithoutEmployee_groupNestedInput, { nullable: true })
  classifications?: ClassificationUpdateManyWithoutEmployee_groupNestedInput;
}
