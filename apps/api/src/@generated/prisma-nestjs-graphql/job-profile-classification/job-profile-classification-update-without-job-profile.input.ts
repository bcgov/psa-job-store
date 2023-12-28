import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput } from '../classification/classification-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileClassificationUpdateWithoutJob_profileInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput;
}
