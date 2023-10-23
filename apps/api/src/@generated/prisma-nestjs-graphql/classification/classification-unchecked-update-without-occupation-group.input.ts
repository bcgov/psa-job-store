import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUncheckedUpdateWithoutOccupation_groupInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  grid_id?: number;

  @Field(() => JobProfileUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutClassificationNestedInput;
}
