import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutJob_provilesInput } from './organization-create-without-job-proviles.input';

@InputType()
export class OrganizationCreateOrConnectWithoutJob_provilesInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutJob_provilesInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutJob_provilesInput)
  create!: OrganizationCreateWithoutJob_provilesInput;
}
