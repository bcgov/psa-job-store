import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionRequestInput } from './department-create-without-position-request.input';
import { DepartmentUpdateWithoutPositionRequestInput } from './department-update-without-position-request.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutPositionRequestInput {
  @Field(() => DepartmentUpdateWithoutPositionRequestInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionRequestInput)
  update!: DepartmentUpdateWithoutPositionRequestInput;

  @Field(() => DepartmentCreateWithoutPositionRequestInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionRequestInput)
  create!: DepartmentCreateWithoutPositionRequestInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
