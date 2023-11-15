import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutPositionsInput } from './organization-create-without-positions.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutPositionsInput } from './organization-create-or-connect-without-positions.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutPositionsInput {
  @Field(() => OrganizationCreateWithoutPositionsInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutPositionsInput)
  create?: OrganizationCreateWithoutPositionsInput;

  @Field(() => OrganizationCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutPositionsInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;
}
