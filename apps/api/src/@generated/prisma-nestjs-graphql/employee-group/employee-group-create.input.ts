import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedManyWithoutEmployee_groupInput } from '../classification/classification-create-nested-many-without-employee-group.input';

@InputType()
export class EmployeeGroupCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationCreateNestedManyWithoutEmployee_groupInput, { nullable: true })
  classifications?: ClassificationCreateNestedManyWithoutEmployee_groupInput;
}
