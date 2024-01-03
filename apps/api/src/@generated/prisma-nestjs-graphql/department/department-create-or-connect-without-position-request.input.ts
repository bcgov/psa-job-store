import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionRequestInput } from './department-create-without-position-request.input';

@InputType()
export class DepartmentCreateOrConnectWithoutPositionRequestInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutPositionRequestInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionRequestInput)
  create!: DepartmentCreateWithoutPositionRequestInput;
}
