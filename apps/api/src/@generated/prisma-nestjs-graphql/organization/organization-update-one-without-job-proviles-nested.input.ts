import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutJob_provilesInput } from './organization-create-without-job-proviles.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutJob_provilesInput } from './organization-create-or-connect-without-job-proviles.input';
import { OrganizationUpsertWithoutJob_provilesInput } from './organization-upsert-without-job-proviles.input';
import { OrganizationWhereInput } from './organization-where.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationUpdateToOneWithWhereWithoutJob_provilesInput } from './organization-update-to-one-with-where-without-job-proviles.input';

@InputType()
export class OrganizationUpdateOneWithoutJob_provilesNestedInput {
  @Field(() => OrganizationCreateWithoutJob_provilesInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutJob_provilesInput)
  create?: OrganizationCreateWithoutJob_provilesInput;

  @Field(() => OrganizationCreateOrConnectWithoutJob_provilesInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutJob_provilesInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutJob_provilesInput;

  @Field(() => OrganizationUpsertWithoutJob_provilesInput, { nullable: true })
  @Type(() => OrganizationUpsertWithoutJob_provilesInput)
  upsert?: OrganizationUpsertWithoutJob_provilesInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  disconnect?: OrganizationWhereInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  delete?: OrganizationWhereInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutJob_provilesInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutJob_provilesInput)
  update?: OrganizationUpdateToOneWithWhereWithoutJob_provilesInput;
}
