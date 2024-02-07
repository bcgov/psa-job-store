import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupUpdateOneRequiredWithoutClassificationsNestedInput } from '../employee-group/employee-group-update-one-required-without-classifications-nested.input';
import { JobProfileClassificationUpdateManyWithoutClassificationNestedInput } from '../job-profile-classification/job-profile-classification-update-many-without-classification-nested.input';
import { ClassificationDepartmentUpdateManyWithoutClassificationNestedInput } from '../classification-department/classification-department-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutReporteesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  grade?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => EmployeeGroupUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  employee_group?: EmployeeGroupUpdateOneRequiredWithoutClassificationsNestedInput;

  @Field(() => JobProfileClassificationUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileClassificationUpdateManyWithoutClassificationNestedInput;

  @Field(() => ClassificationDepartmentUpdateManyWithoutClassificationNestedInput, { nullable: true })
  departments?: ClassificationDepartmentUpdateManyWithoutClassificationNestedInput;
}
