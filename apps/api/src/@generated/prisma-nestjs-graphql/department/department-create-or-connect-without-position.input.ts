import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionInput } from './department-create-without-position.input';

@InputType()
export class DepartmentCreateOrConnectWithoutPositionInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutPositionInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionInput)
  create!: DepartmentCreateWithoutPositionInput;
}
