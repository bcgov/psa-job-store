import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeUpdateWithoutOrganizationInput } from './employee-update-without-organization.input';

@InputType()
export class EmployeeUpdateWithWhereUniqueWithoutOrganizationInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutOrganizationInput)
  data!: EmployeeUpdateWithoutOrganizationInput;
}
