import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutJob_profilesInput } from './organization-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutJob_profilesInput } from './organization-create-or-connect-without-job-profiles.input';
import { OrganizationUpsertWithoutJob_profilesInput } from './organization-upsert-without-job-profiles.input';
import { OrganizationWhereInput } from './organization-where.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationUpdateToOneWithWhereWithoutJob_profilesInput } from './organization-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class OrganizationUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => OrganizationCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutJob_profilesInput)
  create?: OrganizationCreateWithoutJob_profilesInput;

  @Field(() => OrganizationCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutJob_profilesInput;

  @Field(() => OrganizationUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => OrganizationUpsertWithoutJob_profilesInput)
  upsert?: OrganizationUpsertWithoutJob_profilesInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  disconnect?: OrganizationWhereInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  delete?: OrganizationWhereInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: OrganizationUpdateToOneWithWhereWithoutJob_profilesInput;
}
