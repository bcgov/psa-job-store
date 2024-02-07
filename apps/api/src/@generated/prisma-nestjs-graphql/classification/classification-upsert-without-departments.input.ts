import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutDepartmentsInput } from './classification-update-without-departments.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutDepartmentsInput } from './classification-create-without-departments.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutDepartmentsInput {
  @Field(() => ClassificationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutDepartmentsInput)
  update!: ClassificationUpdateWithoutDepartmentsInput;

  @Field(() => ClassificationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutDepartmentsInput)
  create!: ClassificationCreateWithoutDepartmentsInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
