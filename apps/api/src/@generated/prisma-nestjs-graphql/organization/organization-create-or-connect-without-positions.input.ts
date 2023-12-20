import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutPositionsInput } from './organization-create-without-positions.input';

@InputType()
export class OrganizationCreateOrConnectWithoutPositionsInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutPositionsInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutPositionsInput)
  create!: OrganizationCreateWithoutPositionsInput;
}
