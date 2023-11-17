import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutOrganizationInput } from './position-create-without-organization.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutOrganizationInput } from './position-create-or-connect-without-organization.input';
import { PositionCreateManyOrganizationInputEnvelope } from './position-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';

@InputType()
export class PositionCreateNestedManyWithoutOrganizationInput {
  @Field(() => [PositionCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionCreateWithoutOrganizationInput)
  create?: Array<PositionCreateWithoutOrganizationInput>;

  @Field(() => [PositionCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<PositionCreateOrConnectWithoutOrganizationInput>;

  @Field(() => PositionCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => PositionCreateManyOrganizationInputEnvelope)
  createMany?: PositionCreateManyOrganizationInputEnvelope;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;
}
