import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridCreateNestedOneWithoutClassificationsInput } from '../grid/grid-create-nested-one-without-classifications.input';
import { OccupationGroupCreateNestedOneWithoutClassificationsInput } from '../occupation-group/occupation-group-create-nested-one-without-classifications.input';
import { JobProfileReportsToCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutJob_profilesInput {
  @Field(() => GridCreateNestedOneWithoutClassificationsInput, { nullable: false })
  grid!: GridCreateNestedOneWithoutClassificationsInput;

  @Field(() => OccupationGroupCreateNestedOneWithoutClassificationsInput, { nullable: false })
  occupation_group!: OccupationGroupCreateNestedOneWithoutClassificationsInput;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutClassificationInput, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToCreateNestedManyWithoutClassificationInput;
}
