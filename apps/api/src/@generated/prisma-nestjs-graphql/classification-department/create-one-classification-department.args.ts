import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateInput } from './classification-department-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneClassificationDepartmentArgs {
  @Field(() => ClassificationDepartmentCreateInput, { nullable: false })
  @Type(() => ClassificationDepartmentCreateInput)
  data!: ClassificationDepartmentCreateInput;
}
