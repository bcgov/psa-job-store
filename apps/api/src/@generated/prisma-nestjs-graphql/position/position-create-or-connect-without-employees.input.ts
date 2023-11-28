import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionCreateWithoutEmployeesInput } from './position-create-without-employees.input';

@InputType()
export class PositionCreateOrConnectWithoutEmployeesInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => PositionCreateWithoutEmployeesInput)
  create!: PositionCreateWithoutEmployeesInput;
}
