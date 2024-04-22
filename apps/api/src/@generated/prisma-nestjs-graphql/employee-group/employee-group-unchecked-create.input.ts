import { Field, InputType } from '@nestjs/graphql';
import { ClassificationUncheckedCreateNestedManyWithoutEmployee_groupInput } from '../classification/classification-unchecked-create-nested-many-without-employee-group.input';

@InputType()
export class EmployeeGroupUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationUncheckedCreateNestedManyWithoutEmployee_groupInput, { nullable: true })
  classifications?: ClassificationUncheckedCreateNestedManyWithoutEmployee_groupInput;
}
