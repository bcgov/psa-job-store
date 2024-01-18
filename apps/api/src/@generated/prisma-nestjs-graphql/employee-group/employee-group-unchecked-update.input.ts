import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUncheckedUpdateManyWithoutEmployee_groupNestedInput } from '../classification/classification-unchecked-update-many-without-employee-group-nested.input';

@InputType()
export class EmployeeGroupUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ClassificationUncheckedUpdateManyWithoutEmployee_groupNestedInput, { nullable: true })
  classifications?: ClassificationUncheckedUpdateManyWithoutEmployee_groupNestedInput;
}
