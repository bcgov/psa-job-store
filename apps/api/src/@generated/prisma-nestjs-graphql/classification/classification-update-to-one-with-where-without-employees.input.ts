import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutEmployeesInput } from './classification-update-without-employees.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutEmployeesInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutEmployeesInput)
  data!: ClassificationUpdateWithoutEmployeesInput;
}
