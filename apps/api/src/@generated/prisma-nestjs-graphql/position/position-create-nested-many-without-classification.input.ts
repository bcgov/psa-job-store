import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutClassificationInput } from './position-create-without-classification.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutClassificationInput } from './position-create-or-connect-without-classification.input';
import { PositionCreateManyClassificationInputEnvelope } from './position-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';

@InputType()
export class PositionCreateNestedManyWithoutClassificationInput {
  @Field(() => [PositionCreateWithoutClassificationInput], { nullable: true })
  @Type(() => PositionCreateWithoutClassificationInput)
  create?: Array<PositionCreateWithoutClassificationInput>;

  @Field(() => [PositionCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<PositionCreateOrConnectWithoutClassificationInput>;

  @Field(() => PositionCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => PositionCreateManyClassificationInputEnvelope)
  createMany?: PositionCreateManyClassificationInputEnvelope;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;
}
