import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutPositionInput } from './organization-create-without-position.input';

@InputType()
export class OrganizationCreateOrConnectWithoutPositionInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutPositionInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutPositionInput)
  create!: OrganizationCreateWithoutPositionInput;
}
