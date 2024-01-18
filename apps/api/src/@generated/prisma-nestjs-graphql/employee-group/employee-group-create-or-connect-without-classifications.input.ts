import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateWithoutClassificationsInput } from './employee-group-create-without-classifications.input';

@InputType()
export class EmployeeGroupCreateOrConnectWithoutClassificationsInput {
  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeGroupWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => EmployeeGroupCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => EmployeeGroupCreateWithoutClassificationsInput)
  create!: EmployeeGroupCreateWithoutClassificationsInput;
}
