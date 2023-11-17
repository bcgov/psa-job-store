import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutOrganizationInput } from './employee-create-without-organization.input';

@InputType()
export class EmployeeCreateOrConnectWithoutOrganizationInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutOrganizationInput)
  create!: EmployeeCreateWithoutOrganizationInput;
}
