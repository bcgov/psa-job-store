import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationDepartmentUncheckedCreateWithoutDepartmentInput {
  @Field(() => String, { nullable: false })
  classification_id!: string;
}
