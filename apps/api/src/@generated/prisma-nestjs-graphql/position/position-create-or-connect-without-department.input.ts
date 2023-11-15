import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionCreateWithoutDepartmentInput } from './position-create-without-department.input';

@InputType()
export class PositionCreateOrConnectWithoutDepartmentInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionCreateWithoutDepartmentInput)
  create!: PositionCreateWithoutDepartmentInput;
}
