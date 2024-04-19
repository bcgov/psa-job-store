import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutOrganizationInput } from './department-update-without-organization.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentUpdateWithWhereUniqueWithoutOrganizationInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutOrganizationInput)
  data!: DepartmentUpdateWithoutOrganizationInput;
}
