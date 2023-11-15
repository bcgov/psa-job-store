import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutPositionsInput } from './organization-create-without-positions.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutPositionsInput } from './organization-create-or-connect-without-positions.input';
import { OrganizationUpsertWithoutPositionsInput } from './organization-upsert-without-positions.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationUpdateToOneWithWhereWithoutPositionsInput } from './organization-update-to-one-with-where-without-positions.input';

@InputType()
export class OrganizationUpdateOneRequiredWithoutPositionsNestedInput {
  @Field(() => OrganizationCreateWithoutPositionsInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutPositionsInput)
  create?: OrganizationCreateWithoutPositionsInput;

  @Field(() => OrganizationCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutPositionsInput;

  @Field(() => OrganizationUpsertWithoutPositionsInput, { nullable: true })
  @Type(() => OrganizationUpsertWithoutPositionsInput)
  upsert?: OrganizationUpsertWithoutPositionsInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutPositionsInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutPositionsInput)
  update?: OrganizationUpdateToOneWithWhereWithoutPositionsInput;
}
