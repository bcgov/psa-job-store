import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput;
}
