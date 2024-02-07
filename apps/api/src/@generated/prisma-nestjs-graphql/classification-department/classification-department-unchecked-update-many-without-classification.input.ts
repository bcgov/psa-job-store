import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationDepartmentUncheckedUpdateManyWithoutClassificationInput {
  @Field(() => String, { nullable: true })
  department_id?: string;
}
