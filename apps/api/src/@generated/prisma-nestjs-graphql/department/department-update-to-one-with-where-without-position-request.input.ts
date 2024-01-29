import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutPositionRequestInput } from './department-update-without-position-request.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutPositionRequestInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutPositionRequestInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionRequestInput)
  data!: DepartmentUpdateWithoutPositionRequestInput;
}
