import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationUpdateInput } from './organization-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@ArgsType()
export class UpdateOneOrganizationArgs {
  @Field(() => OrganizationUpdateInput, { nullable: false })
  @Type(() => OrganizationUpdateInput)
  data!: OrganizationUpdateInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;
}
