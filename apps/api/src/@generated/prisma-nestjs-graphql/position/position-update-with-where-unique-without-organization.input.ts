import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutOrganizationInput } from './position-update-without-organization.input';

@InputType()
export class PositionUpdateWithWhereUniqueWithoutOrganizationInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => PositionUpdateWithoutOrganizationInput)
  data!: PositionUpdateWithoutOrganizationInput;
}
