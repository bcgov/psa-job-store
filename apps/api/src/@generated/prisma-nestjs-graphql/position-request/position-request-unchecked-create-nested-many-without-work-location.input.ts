import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutWorkLocationInput } from './position-request-create-without-work-location.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutWorkLocationInput } from './position-request-create-or-connect-without-work-location.input';
import { PositionRequestCreateManyWorkLocationInputEnvelope } from './position-request-create-many-work-location-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUncheckedCreateNestedManyWithoutWorkLocationInput {
  @Field(() => [PositionRequestCreateWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutWorkLocationInput)
  create?: Array<PositionRequestCreateWithoutWorkLocationInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutWorkLocationInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutWorkLocationInput>;

  @Field(() => PositionRequestCreateManyWorkLocationInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyWorkLocationInputEnvelope)
  createMany?: PositionRequestCreateManyWorkLocationInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;
}
