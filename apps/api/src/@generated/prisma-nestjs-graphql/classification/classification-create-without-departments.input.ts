import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupCreateNestedOneWithoutClassificationsInput } from '../employee-group/employee-group-create-nested-one-without-classifications.input';
import { JobProfileClassificationCreateNestedManyWithoutClassificationInput } from '../job-profile-classification/job-profile-classification-create-nested-many-without-classification.input';
import { JobProfileReportsToCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  grade!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => EmployeeGroupCreateNestedOneWithoutClassificationsInput, { nullable: false })
  employee_group!: EmployeeGroupCreateNestedOneWithoutClassificationsInput;

  @Field(() => JobProfileClassificationCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileClassificationCreateNestedManyWithoutClassificationInput;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToCreateNestedManyWithoutClassificationInput;
}
