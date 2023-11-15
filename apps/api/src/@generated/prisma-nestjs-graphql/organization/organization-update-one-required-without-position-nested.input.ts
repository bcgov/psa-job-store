import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutPositionInput } from './organization-create-without-position.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutPositionInput } from './organization-create-or-connect-without-position.input';
import { OrganizationUpsertWithoutPositionInput } from './organization-upsert-without-position.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationUpdateToOneWithWhereWithoutPositionInput } from './organization-update-to-one-with-where-without-position.input';

@InputType()
export class OrganizationUpdateOneRequiredWithoutPositionNestedInput {
  @Field(() => OrganizationCreateWithoutPositionInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutPositionInput)
  create?: OrganizationCreateWithoutPositionInput;

  @Field(() => OrganizationCreateOrConnectWithoutPositionInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutPositionInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutPositionInput;

  @Field(() => OrganizationUpsertWithoutPositionInput, { nullable: true })
  @Type(() => OrganizationUpsertWithoutPositionInput)
  upsert?: OrganizationUpsertWithoutPositionInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutPositionInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutPositionInput)
  update?: OrganizationUpdateToOneWithWhereWithoutPositionInput;
}
