import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutEmployeeInput } from './classification-update-without-employee.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutEmployeeInput } from './classification-create-without-employee.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutEmployeeInput {
  @Field(() => ClassificationUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutEmployeeInput)
  update!: ClassificationUpdateWithoutEmployeeInput;

  @Field(() => ClassificationCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutEmployeeInput)
  create!: ClassificationCreateWithoutEmployeeInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
