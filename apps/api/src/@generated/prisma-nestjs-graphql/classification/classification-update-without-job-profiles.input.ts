import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-classification-nested.input';
import { EmployeeUpdateManyWithoutClassificationNestedInput } from '../employee/employee-update-many-without-classification-nested.input';
import { PositionUpdateManyWithoutClassificationNestedInput } from '../position/position-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => JobProfileReportsToUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUpdateManyWithoutClassificationNestedInput;

  @Field(() => EmployeeUpdateManyWithoutClassificationNestedInput, { nullable: true })
  employees?: EmployeeUpdateManyWithoutClassificationNestedInput;

  @Field(() => PositionUpdateManyWithoutClassificationNestedInput, { nullable: true })
  positions?: PositionUpdateManyWithoutClassificationNestedInput;
}
