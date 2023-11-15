import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-classification.input';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-classification.input';
import { EmployeeUncheckedCreateNestedManyWithoutClassificationInput } from '../employee/employee-unchecked-create-nested-many-without-classification.input';
import { PositionUncheckedCreateNestedManyWithoutClassificationInput } from '../position/position-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => EmployeeUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  Employee?: EmployeeUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => PositionUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  Position?: PositionUncheckedCreateNestedManyWithoutClassificationInput;
}
