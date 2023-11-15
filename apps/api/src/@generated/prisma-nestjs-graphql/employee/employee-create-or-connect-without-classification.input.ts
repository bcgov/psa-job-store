import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutClassificationInput } from './employee-create-without-classification.input';

@InputType()
export class EmployeeCreateOrConnectWithoutClassificationInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeCreateWithoutClassificationInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutClassificationInput)
  create!: EmployeeCreateWithoutClassificationInput;
}
