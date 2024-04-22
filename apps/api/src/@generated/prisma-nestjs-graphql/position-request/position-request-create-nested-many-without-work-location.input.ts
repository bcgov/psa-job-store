import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyWorkLocationInputEnvelope } from './position-request-create-many-work-location-input-envelope.input';
import { PositionRequestCreateOrConnectWithoutWorkLocationInput } from './position-request-create-or-connect-without-work-location.input';
import { PositionRequestCreateWithoutWorkLocationInput } from './position-request-create-without-work-location.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestCreateNestedManyWithoutWorkLocationInput {
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
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;
}
