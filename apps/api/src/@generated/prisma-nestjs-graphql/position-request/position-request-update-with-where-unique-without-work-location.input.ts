import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutWorkLocationInput } from './position-request-update-without-work-location.input';

@InputType()
export class PositionRequestUpdateWithWhereUniqueWithoutWorkLocationInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestUpdateWithoutWorkLocationInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutWorkLocationInput)
  data!: PositionRequestUpdateWithoutWorkLocationInput;
}
