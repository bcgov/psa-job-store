import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutJob_profilesInput } from './organization-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutJob_profilesInput } from './organization-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutJob_profilesInput {
  @Field(() => OrganizationCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutJob_profilesInput)
  create?: OrganizationCreateWithoutJob_profilesInput;

  @Field(() => OrganizationCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutJob_profilesInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;
}
