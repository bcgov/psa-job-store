import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridCreateNestedOneWithoutClassificationsInput } from '../grid/grid-create-nested-one-without-classifications.input';
import { OccupationGroupCreateNestedOneWithoutClassificationsInput } from '../occupation-group/occupation-group-create-nested-one-without-classifications.input';
import { JobProfileCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutDependent_job_profilesInput {
  @Field(() => GridCreateNestedOneWithoutClassificationsInput, { nullable: false })
  grid!: GridCreateNestedOneWithoutClassificationsInput;

  @Field(() => OccupationGroupCreateNestedOneWithoutClassificationsInput, { nullable: false })
  occupation_group!: OccupationGroupCreateNestedOneWithoutClassificationsInput;

  @Field(() => JobProfileCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutClassificationInput;
}
