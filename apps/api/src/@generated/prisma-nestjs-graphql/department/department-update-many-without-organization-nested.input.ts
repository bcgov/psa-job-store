import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentCreateManyOrganizationInputEnvelope } from './department-create-many-organization-input-envelope.input';
import { DepartmentCreateOrConnectWithoutOrganizationInput } from './department-create-or-connect-without-organization.input';
import { DepartmentCreateWithoutOrganizationInput } from './department-create-without-organization.input';
import { DepartmentScalarWhereInput } from './department-scalar-where.input';
import { DepartmentUpdateManyWithWhereWithoutOrganizationInput } from './department-update-many-with-where-without-organization.input';
import { DepartmentUpdateWithWhereUniqueWithoutOrganizationInput } from './department-update-with-where-unique-without-organization.input';
import { DepartmentUpsertWithWhereUniqueWithoutOrganizationInput } from './department-upsert-with-where-unique-without-organization.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentUpdateManyWithoutOrganizationNestedInput {
  @Field(() => [DepartmentCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentCreateWithoutOrganizationInput)
  create?: Array<DepartmentCreateWithoutOrganizationInput>;

  @Field(() => [DepartmentCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<DepartmentCreateOrConnectWithoutOrganizationInput>;

  @Field(() => [DepartmentUpsertWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentUpsertWithWhereUniqueWithoutOrganizationInput)
  upsert?: Array<DepartmentUpsertWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => DepartmentCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => DepartmentCreateManyOrganizationInputEnvelope)
  createMany?: DepartmentCreateManyOrganizationInputEnvelope;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  set?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentUpdateWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentUpdateWithWhereUniqueWithoutOrganizationInput)
  update?: Array<DepartmentUpdateWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => [DepartmentUpdateManyWithWhereWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentUpdateManyWithWhereWithoutOrganizationInput)
  updateMany?: Array<DepartmentUpdateManyWithWhereWithoutOrganizationInput>;

  @Field(() => [DepartmentScalarWhereInput], { nullable: true })
  @Type(() => DepartmentScalarWhereInput)
  deleteMany?: Array<DepartmentScalarWhereInput>;
}
