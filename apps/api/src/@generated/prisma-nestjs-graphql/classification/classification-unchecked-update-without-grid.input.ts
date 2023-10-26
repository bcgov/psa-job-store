import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-classification-nested.input';
import { JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUncheckedUpdateWithoutGridInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  occupation_group_id?: number;

  @Field(() => JobProfileUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput;
}
