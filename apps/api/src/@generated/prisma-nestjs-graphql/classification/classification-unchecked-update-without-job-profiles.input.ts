import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-classification-nested.input';
import { EmployeeUncheckedUpdateManyWithoutClassificationNestedInput } from '../employee/employee-unchecked-update-many-without-classification-nested.input';
import { PositionUncheckedUpdateManyWithoutClassificationNestedInput } from '../position/position-unchecked-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUncheckedUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => EmployeeUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  employees?: EmployeeUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => PositionUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  positions?: PositionUncheckedUpdateManyWithoutClassificationNestedInput;
}
