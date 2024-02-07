import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentWhereInput } from './classification-department-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyClassificationDepartmentArgs {
  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  @Type(() => ClassificationDepartmentWhereInput)
  where?: ClassificationDepartmentWhereInput;
}
