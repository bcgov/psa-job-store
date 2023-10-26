import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateWithoutDependent_job_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  grid_id!: number;

  @Field(() => Int, { nullable: false })
  occupation_group_id!: number;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutClassificationInput;
}
