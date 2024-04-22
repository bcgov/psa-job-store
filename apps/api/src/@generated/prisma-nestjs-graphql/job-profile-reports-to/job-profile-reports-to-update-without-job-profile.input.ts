import { Field, InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutReporteesNestedInput } from '../classification/classification-update-one-required-without-reportees-nested.input';

@InputType()
export class JobProfileReportsToUpdateWithoutJob_profileInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutReporteesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutReporteesNestedInput;
}
