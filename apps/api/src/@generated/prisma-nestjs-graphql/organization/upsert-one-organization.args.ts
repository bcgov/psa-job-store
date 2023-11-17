import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateInput } from './organization-create.input';
import { OrganizationUpdateInput } from './organization-update.input';

@ArgsType()
export class UpsertOneOrganizationArgs {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateInput, { nullable: false })
  @Type(() => OrganizationCreateInput)
  create!: OrganizationCreateInput;

  @Field(() => OrganizationUpdateInput, { nullable: false })
  @Type(() => OrganizationUpdateInput)
  update!: OrganizationUpdateInput;
}
