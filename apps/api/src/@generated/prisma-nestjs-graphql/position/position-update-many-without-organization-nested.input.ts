import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutOrganizationInput } from './position-create-without-organization.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutOrganizationInput } from './position-create-or-connect-without-organization.input';
import { PositionUpsertWithWhereUniqueWithoutOrganizationInput } from './position-upsert-with-where-unique-without-organization.input';
import { PositionCreateManyOrganizationInputEnvelope } from './position-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { PositionUpdateWithWhereUniqueWithoutOrganizationInput } from './position-update-with-where-unique-without-organization.input';
import { PositionUpdateManyWithWhereWithoutOrganizationInput } from './position-update-many-with-where-without-organization.input';
import { PositionScalarWhereInput } from './position-scalar-where.input';

@InputType()
export class PositionUpdateManyWithoutOrganizationNestedInput {
  @Field(() => [PositionCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionCreateWithoutOrganizationInput)
  create?: Array<PositionCreateWithoutOrganizationInput>;

  @Field(() => [PositionCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<PositionCreateOrConnectWithoutOrganizationInput>;

  @Field(() => [PositionUpsertWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionUpsertWithWhereUniqueWithoutOrganizationInput)
  upsert?: Array<PositionUpsertWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => PositionCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => PositionCreateManyOrganizationInputEnvelope)
  createMany?: PositionCreateManyOrganizationInputEnvelope;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionUpdateWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionUpdateWithWhereUniqueWithoutOrganizationInput)
  update?: Array<PositionUpdateWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => [PositionUpdateManyWithWhereWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionUpdateManyWithWhereWithoutOrganizationInput)
  updateMany?: Array<PositionUpdateManyWithWhereWithoutOrganizationInput>;

  @Field(() => [PositionScalarWhereInput], { nullable: true })
  @Type(() => PositionScalarWhereInput)
  deleteMany?: Array<PositionScalarWhereInput>;
}
