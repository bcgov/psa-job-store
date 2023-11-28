import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutOrganizationInput } from './employee-create-without-organization.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutOrganizationInput } from './employee-create-or-connect-without-organization.input';
import { EmployeeUpsertWithWhereUniqueWithoutOrganizationInput } from './employee-upsert-with-where-unique-without-organization.input';
import { EmployeeCreateManyOrganizationInputEnvelope } from './employee-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { EmployeeUpdateWithWhereUniqueWithoutOrganizationInput } from './employee-update-with-where-unique-without-organization.input';
import { EmployeeUpdateManyWithWhereWithoutOrganizationInput } from './employee-update-many-with-where-without-organization.input';
import { EmployeeScalarWhereInput } from './employee-scalar-where.input';

@InputType()
export class EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput {
  @Field(() => [EmployeeCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeCreateWithoutOrganizationInput)
  create?: Array<EmployeeCreateWithoutOrganizationInput>;

  @Field(() => [EmployeeCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<EmployeeCreateOrConnectWithoutOrganizationInput>;

  @Field(() => [EmployeeUpsertWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeUpsertWithWhereUniqueWithoutOrganizationInput)
  upsert?: Array<EmployeeUpsertWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => EmployeeCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => EmployeeCreateManyOrganizationInputEnvelope)
  createMany?: EmployeeCreateManyOrganizationInputEnvelope;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  set?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeUpdateWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeUpdateWithWhereUniqueWithoutOrganizationInput)
  update?: Array<EmployeeUpdateWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => [EmployeeUpdateManyWithWhereWithoutOrganizationInput], { nullable: true })
  @Type(() => EmployeeUpdateManyWithWhereWithoutOrganizationInput)
  updateMany?: Array<EmployeeUpdateManyWithWhereWithoutOrganizationInput>;

  @Field(() => [EmployeeScalarWhereInput], { nullable: true })
  @Type(() => EmployeeScalarWhereInput)
  deleteMany?: Array<EmployeeScalarWhereInput>;
}
