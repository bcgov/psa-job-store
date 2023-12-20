import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutOrganizationInput } from './department-update-without-organization.input';
import { DepartmentCreateWithoutOrganizationInput } from './department-create-without-organization.input';

@InputType()
export class DepartmentUpsertWithWhereUniqueWithoutOrganizationInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutOrganizationInput)
  update!: DepartmentUpdateWithoutOrganizationInput;

  @Field(() => DepartmentCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutOrganizationInput)
  create!: DepartmentCreateWithoutOrganizationInput;
}
