import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateNestedManyWithoutEmployee_groupInput } from '../professional-designation/professional-designation-create-nested-many-without-employee-group.input';

@InputType()
export class EmployeeGroupCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ProfessionalDesignationCreateNestedManyWithoutEmployee_groupInput, { nullable: true })
  professional_designations?: ProfessionalDesignationCreateNestedManyWithoutEmployee_groupInput;
}
