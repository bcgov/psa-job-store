import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutClassificationsInput } from './department-update-without-classifications.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutClassificationsInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutClassificationsInput)
  data!: DepartmentUpdateWithoutClassificationsInput;
}
