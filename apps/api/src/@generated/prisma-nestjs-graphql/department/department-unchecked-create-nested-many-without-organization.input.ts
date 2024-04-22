import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentCreateManyOrganizationInputEnvelope } from './department-create-many-organization-input-envelope.input';
import { DepartmentCreateOrConnectWithoutOrganizationInput } from './department-create-or-connect-without-organization.input';
import { DepartmentCreateWithoutOrganizationInput } from './department-create-without-organization.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentUncheckedCreateNestedManyWithoutOrganizationInput {
  @Field(() => [DepartmentCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentCreateWithoutOrganizationInput)
  create?: Array<DepartmentCreateWithoutOrganizationInput>;

  @Field(() => [DepartmentCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<DepartmentCreateOrConnectWithoutOrganizationInput>;

  @Field(() => DepartmentCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => DepartmentCreateManyOrganizationInputEnvelope)
  createMany?: DepartmentCreateManyOrganizationInputEnvelope;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;
}
