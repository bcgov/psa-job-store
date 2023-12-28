import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-classification/job-profile-classification-unchecked-create-nested-many-without-classification.input';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput;
}
