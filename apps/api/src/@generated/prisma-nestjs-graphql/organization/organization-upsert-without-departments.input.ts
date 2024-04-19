import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutDepartmentsInput } from './organization-create-without-departments.input';
import { OrganizationUpdateWithoutDepartmentsInput } from './organization-update-without-departments.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutDepartmentsInput {
  @Field(() => OrganizationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutDepartmentsInput)
  update!: OrganizationUpdateWithoutDepartmentsInput;

  @Field(() => OrganizationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutDepartmentsInput)
  create!: OrganizationCreateWithoutDepartmentsInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
