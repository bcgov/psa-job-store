import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput } from '../occupation-group/occupation-group-update-one-required-without-classifications-nested.input';
import { JobProfileUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutGridInput {
  @Field(() => OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  occupation_group?: OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput;

  @Field(() => JobProfileUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutClassificationNestedInput;
}
