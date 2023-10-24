import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridUpdateOneRequiredWithoutClassificationsNestedInput } from '../grid/grid-update-one-required-without-classifications-nested.input';
import { JobProfileUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutOccupation_groupInput {
  @Field(() => GridUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  grid?: GridUpdateOneRequiredWithoutClassificationsNestedInput;

  @Field(() => JobProfileUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutClassificationNestedInput;
}
