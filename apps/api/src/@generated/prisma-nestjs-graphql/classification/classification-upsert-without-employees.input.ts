import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutEmployeesInput } from './classification-update-without-employees.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutEmployeesInput } from './classification-create-without-employees.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutEmployeesInput {
  @Field(() => ClassificationUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutEmployeesInput)
  update!: ClassificationUpdateWithoutEmployeesInput;

  @Field(() => ClassificationCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutEmployeesInput)
  create!: ClassificationCreateWithoutEmployeesInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
