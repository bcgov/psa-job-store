import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-update-many-without-classification-nested.input';
import { JobProfileReportsToUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-classification-nested.input';
import { PositionUpdateManyWithoutClassificationNestedInput } from '../position/position-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutEmployeeInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => JobProfileUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutClassificationNestedInput;

  @Field(() => JobProfileReportsToUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUpdateManyWithoutClassificationNestedInput;

  @Field(() => PositionUpdateManyWithoutClassificationNestedInput, { nullable: true })
  Position?: PositionUpdateManyWithoutClassificationNestedInput;
}
