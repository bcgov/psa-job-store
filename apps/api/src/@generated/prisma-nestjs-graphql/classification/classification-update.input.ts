import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridUpdateOneRequiredWithoutClassificationsNestedInput } from '../grid/grid-update-one-required-without-classifications-nested.input';
import { OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput } from '../occupation-group/occupation-group-update-one-required-without-classifications-nested.input';
import { JobProfileUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-update-many-without-classification-nested.input';
import { JobProfileReportsToUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateInput {
  @Field(() => GridUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  grid?: GridUpdateOneRequiredWithoutClassificationsNestedInput;

  @Field(() => OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  occupation_group?: OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput;

  @Field(() => JobProfileUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutClassificationNestedInput;

  @Field(() => JobProfileReportsToUpdateManyWithoutClassificationNestedInput, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToUpdateManyWithoutClassificationNestedInput;
}
