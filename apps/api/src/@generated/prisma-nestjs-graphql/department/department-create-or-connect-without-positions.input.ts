import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionsInput } from './department-create-without-positions.input';

@InputType()
export class DepartmentCreateOrConnectWithoutPositionsInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutPositionsInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionsInput)
  create!: DepartmentCreateWithoutPositionsInput;
}
