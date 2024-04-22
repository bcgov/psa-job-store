import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutDepartmentsInput } from './organization-create-or-connect-without-departments.input';
import { OrganizationCreateWithoutDepartmentsInput } from './organization-create-without-departments.input';
import { OrganizationUpdateToOneWithWhereWithoutDepartmentsInput } from './organization-update-to-one-with-where-without-departments.input';
import { OrganizationUpsertWithoutDepartmentsInput } from './organization-upsert-without-departments.input';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

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
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutDepartmentsInput)
  update?: OrganizationUpdateToOneWithWhereWithoutDepartmentsInput;
}
