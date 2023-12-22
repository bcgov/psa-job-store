import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutJob_profilesInput } from './organization-create-without-job-profiles.input';

@InputType()
export class OrganizationCreateOrConnectWithoutJob_profilesInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutJob_profilesInput)
  create!: OrganizationCreateWithoutJob_profilesInput;
}
