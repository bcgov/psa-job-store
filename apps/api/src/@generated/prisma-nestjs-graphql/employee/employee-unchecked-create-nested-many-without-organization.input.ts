import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutOrganizationInput } from './employee-create-without-organization.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutOrganizationInput } from './employee-create-or-connect-without-organization.input';
import { EmployeeCreateManyOrganizationInputEnvelope } from './employee-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';

@InputType()
export class EmployeeUncheckedCreateNestedManyWithoutOrganizationInput {
  @Field(() => [EmployeeCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeCreateWithoutOrganizationInput)
  create?: Array<EmployeeCreateWithoutOrganizationInput>;

  @Field(() => [EmployeeCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<EmployeeCreateOrConnectWithoutOrganizationInput>;

  @Field(() => EmployeeCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => EmployeeCreateManyOrganizationInputEnvelope)
  createMany?: EmployeeCreateManyOrganizationInputEnvelope;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;
}
