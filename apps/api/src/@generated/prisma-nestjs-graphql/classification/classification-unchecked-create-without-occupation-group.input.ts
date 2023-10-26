import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-classification.input';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateWithoutOccupation_groupInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  grid_id!: number;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput;
}
