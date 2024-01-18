import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationUncheckedCreateNestedManyWithoutEmployee_groupInput } from '../professional-designation/professional-designation-unchecked-create-nested-many-without-employee-group.input';

@InputType()
export class EmployeeGroupUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ProfessionalDesignationUncheckedCreateNestedManyWithoutEmployee_groupInput, { nullable: true })
  professional_designations?: ProfessionalDesignationUncheckedCreateNestedManyWithoutEmployee_groupInput;
}
