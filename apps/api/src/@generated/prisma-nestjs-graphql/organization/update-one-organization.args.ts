import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationUpdateInput } from './organization-update.input';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@ArgsType()
export class UpdateOneOrganizationArgs {
  @Field(() => OrganizationUpdateInput, { nullable: false })
  @Type(() => OrganizationUpdateInput)
  data!: OrganizationUpdateInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;
}
