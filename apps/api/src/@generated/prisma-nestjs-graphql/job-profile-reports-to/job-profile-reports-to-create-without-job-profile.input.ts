import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutReporteesInput } from '../classification/classification-create-nested-one-without-reportees.input';

@InputType()
export class JobProfileReportsToCreateWithoutJob_profileInput {
  @Field(() => ClassificationCreateNestedOneWithoutReporteesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutReporteesInput;
}
