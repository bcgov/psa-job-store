import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionCreateWithoutOrganizationInput } from './position-create-without-organization.input';

@InputType()
export class PositionCreateOrConnectWithoutOrganizationInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => PositionCreateWithoutOrganizationInput)
  create!: PositionCreateWithoutOrganizationInput;
}
