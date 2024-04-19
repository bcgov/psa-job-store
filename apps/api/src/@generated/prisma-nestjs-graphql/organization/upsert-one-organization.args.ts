import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationCreateInput } from './organization-create.input';
import { OrganizationUpdateInput } from './organization-update.input';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@ArgsType()
export class UpsertOneOrganizationArgs {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => OrganizationCreateInput, { nullable: false })
  @Type(() => OrganizationCreateInput)
  create!: OrganizationCreateInput;

  @Field(() => OrganizationUpdateInput, { nullable: false })
  @Type(() => OrganizationUpdateInput)
  update!: OrganizationUpdateInput;
}
