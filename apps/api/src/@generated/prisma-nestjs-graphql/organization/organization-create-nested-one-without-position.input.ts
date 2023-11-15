import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutPositionInput } from './organization-create-without-position.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutPositionInput } from './organization-create-or-connect-without-position.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutPositionInput {
  @Field(() => OrganizationCreateWithoutPositionInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutPositionInput)
  create?: OrganizationCreateWithoutPositionInput;

  @Field(() => OrganizationCreateOrConnectWithoutPositionInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutPositionInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutPositionInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;
}
