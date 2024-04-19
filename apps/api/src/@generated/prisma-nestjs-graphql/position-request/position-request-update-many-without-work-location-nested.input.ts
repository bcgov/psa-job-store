import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyWorkLocationInputEnvelope } from './position-request-create-many-work-location-input-envelope.input';
import { PositionRequestCreateOrConnectWithoutWorkLocationInput } from './position-request-create-or-connect-without-work-location.input';
import { PositionRequestCreateWithoutWorkLocationInput } from './position-request-create-without-work-location.input';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';
import { PositionRequestUpdateManyWithWhereWithoutWorkLocationInput } from './position-request-update-many-with-where-without-work-location.input';
import { PositionRequestUpdateWithWhereUniqueWithoutWorkLocationInput } from './position-request-update-with-where-unique-without-work-location.input';
import { PositionRequestUpsertWithWhereUniqueWithoutWorkLocationInput } from './position-request-upsert-with-where-unique-without-work-location.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUpdateManyWithoutWorkLocationNestedInput {
  @Field(() => [PositionRequestCreateWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutWorkLocationInput)
  create?: Array<PositionRequestCreateWithoutWorkLocationInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutWorkLocationInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutWorkLocationInput>;

  @Field(() => [PositionRequestUpsertWithWhereUniqueWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestUpsertWithWhereUniqueWithoutWorkLocationInput)
  upsert?: Array<PositionRequestUpsertWithWhereUniqueWithoutWorkLocationInput>;

  @Field(() => PositionRequestCreateManyWorkLocationInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyWorkLocationInputEnvelope)
  createMany?: PositionRequestCreateManyWorkLocationInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestUpdateWithWhereUniqueWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestUpdateWithWhereUniqueWithoutWorkLocationInput)
  update?: Array<PositionRequestUpdateWithWhereUniqueWithoutWorkLocationInput>;

  @Field(() => [PositionRequestUpdateManyWithWhereWithoutWorkLocationInput], { nullable: true })
  @Type(() => PositionRequestUpdateManyWithWhereWithoutWorkLocationInput)
  updateMany?: Array<PositionRequestUpdateManyWithWhereWithoutWorkLocationInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  @Type(() => PositionRequestScalarWhereInput)
  deleteMany?: Array<PositionRequestScalarWhereInput>;
}
