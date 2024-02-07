import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutDepartmentsInput } from './classification-update-without-departments.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutDepartmentsInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutDepartmentsInput)
  data!: ClassificationUpdateWithoutDepartmentsInput;
}
