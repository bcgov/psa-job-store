import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutClassificationInput } from './position-create-without-classification.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutClassificationInput } from './position-create-or-connect-without-classification.input';
import { PositionUpsertWithWhereUniqueWithoutClassificationInput } from './position-upsert-with-where-unique-without-classification.input';
import { PositionCreateManyClassificationInputEnvelope } from './position-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { PositionUpdateWithWhereUniqueWithoutClassificationInput } from './position-update-with-where-unique-without-classification.input';
import { PositionUpdateManyWithWhereWithoutClassificationInput } from './position-update-many-with-where-without-classification.input';
import { PositionScalarWhereInput } from './position-scalar-where.input';

@InputType()
export class PositionUncheckedUpdateManyWithoutClassificationNestedInput {
  @Field(() => [PositionCreateWithoutClassificationInput], { nullable: true })
  @Type(() => PositionCreateWithoutClassificationInput)
  create?: Array<PositionCreateWithoutClassificationInput>;

  @Field(() => [PositionCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<PositionCreateOrConnectWithoutClassificationInput>;

  @Field(() => [PositionUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => PositionUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<PositionUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => PositionCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => PositionCreateManyClassificationInputEnvelope)
  createMany?: PositionCreateManyClassificationInputEnvelope;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => PositionUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<PositionUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [PositionUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => PositionUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<PositionUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [PositionScalarWhereInput], { nullable: true })
  @Type(() => PositionScalarWhereInput)
  deleteMany?: Array<PositionScalarWhereInput>;
}
