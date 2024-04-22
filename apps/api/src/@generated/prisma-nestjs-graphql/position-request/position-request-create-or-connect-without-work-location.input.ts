import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutWorkLocationInput } from './position-request-create-without-work-location.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutWorkLocationInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestCreateWithoutWorkLocationInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutWorkLocationInput)
  create!: PositionRequestCreateWithoutWorkLocationInput;
}
