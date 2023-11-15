import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutOrganizationInput } from './position-update-without-organization.input';
import { PositionCreateWithoutOrganizationInput } from './position-create-without-organization.input';

@InputType()
export class PositionUpsertWithWhereUniqueWithoutOrganizationInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => PositionUpdateWithoutOrganizationInput)
  update!: PositionUpdateWithoutOrganizationInput;

  @Field(() => PositionCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => PositionCreateWithoutOrganizationInput)
  create!: PositionCreateWithoutOrganizationInput;
}
