import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutWorkLocationInput } from './position-request-create-without-work-location.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutWorkLocationInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestCreateWithoutWorkLocationInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutWorkLocationInput)
  create!: PositionRequestCreateWithoutWorkLocationInput;
}
