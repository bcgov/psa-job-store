import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridCreateNestedOneWithoutClassificationsInput } from '../grid/grid-create-nested-one-without-classifications.input';
import { JobProfileCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutOccupation_groupInput {
  @Field(() => GridCreateNestedOneWithoutClassificationsInput, { nullable: false })
  grid!: GridCreateNestedOneWithoutClassificationsInput;

  @Field(() => JobProfileCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutClassificationInput;
}
