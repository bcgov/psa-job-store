import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateWithoutJob_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  grid_id!: number;

  @Field(() => Int, { nullable: false })
  occupation_group_id!: number;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput;
}
