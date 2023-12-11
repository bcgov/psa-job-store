import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-classification-nested.input';
import { JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-classification-nested.input';
import { EmployeeUncheckedUpdateManyWithoutClassificationNestedInput } from '../employee/employee-unchecked-update-many-without-classification-nested.input';
import { PositionUncheckedUpdateManyWithoutClassificationNestedInput } from '../position/position-unchecked-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUncheckedUpdateWithoutPositionRequestInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => EmployeeUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  employees?: EmployeeUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => PositionUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  positions?: PositionUncheckedUpdateManyWithoutClassificationNestedInput;
}
