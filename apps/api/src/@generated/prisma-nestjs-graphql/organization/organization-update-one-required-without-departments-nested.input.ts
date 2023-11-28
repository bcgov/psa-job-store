import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutDepartmentsInput } from './organization-create-without-departments.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutDepartmentsInput } from './organization-create-or-connect-without-departments.input';
import { OrganizationUpsertWithoutDepartmentsInput } from './organization-upsert-without-departments.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationUpdateToOneWithWhereWithoutDepartmentsInput } from './organization-update-to-one-with-where-without-departments.input';

@InputType()
export class OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput {
  @Field(() => OrganizationCreateWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutDepartmentsInput)
  create?: OrganizationCreateWithoutDepartmentsInput;

  @Field(() => OrganizationCreateOrConnectWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutDepartmentsInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutDepartmentsInput;

  @Field(() => OrganizationUpsertWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationUpsertWithoutDepartmentsInput)
  upsert?: OrganizationUpsertWithoutDepartmentsInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutDepartmentsInput)
  update?: OrganizationUpdateToOneWithWhereWithoutDepartmentsInput;
}
