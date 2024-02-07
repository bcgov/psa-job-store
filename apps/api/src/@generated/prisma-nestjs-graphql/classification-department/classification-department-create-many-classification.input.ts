import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationDepartmentCreateManyClassificationInput {
  @Field(() => String, { nullable: false })
  department_id!: string;
}
