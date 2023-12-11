import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutClassificationInput } from './position-request-update-without-classification.input';
import { PositionRequestCreateWithoutClassificationInput } from './position-request-create-without-classification.input';

@InputType()
export class PositionRequestUpsertWithWhereUniqueWithoutClassificationInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>;

  @Field(() => PositionRequestUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutClassificationInput)
  update!: PositionRequestUpdateWithoutClassificationInput;

  @Field(() => PositionRequestCreateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutClassificationInput)
  create!: PositionRequestCreateWithoutClassificationInput;
}
