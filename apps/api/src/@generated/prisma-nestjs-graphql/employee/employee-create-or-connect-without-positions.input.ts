import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutPositionsInput } from './employee-create-without-positions.input';

@InputType()
export class EmployeeCreateOrConnectWithoutPositionsInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeCreateWithoutPositionsInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutPositionsInput)
  create!: EmployeeCreateWithoutPositionsInput;
}
