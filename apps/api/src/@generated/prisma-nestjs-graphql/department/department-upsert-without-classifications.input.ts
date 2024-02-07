import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateWithoutClassificationsInput } from './department-update-without-classifications.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutClassificationsInput } from './department-create-without-classifications.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutClassificationsInput {
  @Field(() => DepartmentUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutClassificationsInput)
  update!: DepartmentUpdateWithoutClassificationsInput;

  @Field(() => DepartmentCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutClassificationsInput)
  create!: DepartmentCreateWithoutClassificationsInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
