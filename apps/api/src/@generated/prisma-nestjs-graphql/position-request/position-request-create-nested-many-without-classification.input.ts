import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutClassificationInput } from './position-request-create-without-classification.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutClassificationInput } from './position-request-create-or-connect-without-classification.input';
import { PositionRequestCreateManyClassificationInputEnvelope } from './position-request-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestCreateNestedManyWithoutClassificationInput {
  @Field(() => [PositionRequestCreateWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutClassificationInput)
  create?: Array<PositionRequestCreateWithoutClassificationInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutClassificationInput>;

  @Field(() => PositionRequestCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyClassificationInputEnvelope)
  createMany?: PositionRequestCreateManyClassificationInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;
}
