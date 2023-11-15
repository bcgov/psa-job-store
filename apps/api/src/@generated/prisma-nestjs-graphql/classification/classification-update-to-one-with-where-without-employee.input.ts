import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutEmployeeInput } from './classification-update-without-employee.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutEmployeeInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutEmployeeInput)
  data!: ClassificationUpdateWithoutEmployeeInput;
}
