import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutJob_provilesInput } from './organization-create-without-job-proviles.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutJob_provilesInput } from './organization-create-or-connect-without-job-proviles.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutJob_provilesInput {
  @Field(() => OrganizationCreateWithoutJob_provilesInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutJob_provilesInput)
  create?: OrganizationCreateWithoutJob_provilesInput;

  @Field(() => OrganizationCreateOrConnectWithoutJob_provilesInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutJob_provilesInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutJob_provilesInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;
}
