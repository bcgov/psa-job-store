import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-classification.input';
import { EmployeeCreateNestedManyWithoutClassificationInput } from '../employee/employee-create-nested-many-without-classification.input';
import { PositionCreateNestedManyWithoutClassificationInput } from '../position/position-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToCreateNestedManyWithoutClassificationInput;

  @Field(() => EmployeeCreateNestedManyWithoutClassificationInput, { nullable: true })
  employees?: EmployeeCreateNestedManyWithoutClassificationInput;

  @Field(() => PositionCreateNestedManyWithoutClassificationInput, { nullable: true })
  positions?: PositionCreateNestedManyWithoutClassificationInput;
}
