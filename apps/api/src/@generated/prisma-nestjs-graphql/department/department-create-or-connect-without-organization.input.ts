import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutOrganizationInput } from './department-create-without-organization.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateOrConnectWithoutOrganizationInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutOrganizationInput)
  create!: DepartmentCreateWithoutOrganizationInput;
}
