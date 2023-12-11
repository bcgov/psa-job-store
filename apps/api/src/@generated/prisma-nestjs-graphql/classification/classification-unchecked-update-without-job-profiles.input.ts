import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUncheckedUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput;
}
