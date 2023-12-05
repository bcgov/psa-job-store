import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-update-many-without-classification-nested.input';
import { EmployeeUpdateManyWithoutClassificationNestedInput } from '../employee/employee-update-many-without-classification-nested.input';
import { PositionUpdateManyWithoutClassificationNestedInput } from '../position/position-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutReporteesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutClassificationNestedInput;

  @Field(() => EmployeeUpdateManyWithoutClassificationNestedInput, { nullable: true })
  employees?: EmployeeUpdateManyWithoutClassificationNestedInput;

  @Field(() => PositionUpdateManyWithoutClassificationNestedInput, { nullable: true })
  positions?: PositionUpdateManyWithoutClassificationNestedInput;
}
