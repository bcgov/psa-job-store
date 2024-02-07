import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationDepartmentUncheckedCreateWithoutClassificationInput {
  @Field(() => String, { nullable: false })
  department_id!: string;
}
