import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutClassificationInput } from './position-request-create-without-classification.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutClassificationInput } from './position-request-create-or-connect-without-classification.input';
import { PositionRequestUpsertWithWhereUniqueWithoutClassificationInput } from './position-request-upsert-with-where-unique-without-classification.input';
import { PositionRequestCreateManyClassificationInputEnvelope } from './position-request-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { PositionRequestUpdateWithWhereUniqueWithoutClassificationInput } from './position-request-update-with-where-unique-without-classification.input';
import { PositionRequestUpdateManyWithWhereWithoutClassificationInput } from './position-request-update-many-with-where-without-classification.input';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';

@InputType()
export class PositionRequestUncheckedUpdateManyWithoutClassificationNestedInput {
  @Field(() => [PositionRequestCreateWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutClassificationInput)
  create?: Array<PositionRequestCreateWithoutClassificationInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutClassificationInput>;

  @Field(() => [PositionRequestUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<PositionRequestUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => PositionRequestCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyClassificationInputEnvelope)
  createMany?: PositionRequestCreateManyClassificationInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<PositionRequestUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [PositionRequestUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<PositionRequestUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  @Type(() => PositionRequestScalarWhereInput)
  deleteMany?: Array<PositionRequestScalarWhereInput>;
}
