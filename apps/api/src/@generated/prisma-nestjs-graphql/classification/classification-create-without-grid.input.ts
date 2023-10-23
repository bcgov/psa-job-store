import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OccupationGroupCreateNestedOneWithoutClassificationsInput } from '../occupation-group/occupation-group-create-nested-one-without-classifications.input';
import { JobProfileCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutGridInput {
  @Field(() => OccupationGroupCreateNestedOneWithoutClassificationsInput, { nullable: false })
  occupation_group!: OccupationGroupCreateNestedOneWithoutClassificationsInput;

  @Field(() => JobProfileCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutClassificationInput;
}
