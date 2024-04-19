import { Field, InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutReporteesInput } from '../classification/classification-create-nested-one-without-reportees.input';

@InputType()
export class JobProfileReportsToCreateWithoutJob_profileInput {
  @Field(() => ClassificationCreateNestedOneWithoutReporteesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutReporteesInput;
}
