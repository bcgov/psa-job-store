import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationDepartmentCreateManyDepartmentInput {
  @Field(() => String, { nullable: false })
  classification_id!: string;
}
