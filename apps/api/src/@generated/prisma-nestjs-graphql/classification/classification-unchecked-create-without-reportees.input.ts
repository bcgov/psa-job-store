import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-classification.input';
import { EmployeeUncheckedCreateNestedManyWithoutClassificationInput } from '../employee/employee-unchecked-create-nested-many-without-classification.input';
import { PositionUncheckedCreateNestedManyWithoutClassificationInput } from '../position/position-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateWithoutReporteesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => EmployeeUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  employees?: EmployeeUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => PositionUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  positions?: PositionUncheckedCreateNestedManyWithoutClassificationInput;
}
