import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutClassificationInput } from './position-update-without-classification.input';
import { PositionCreateWithoutClassificationInput } from './position-create-without-classification.input';

@InputType()
export class PositionUpsertWithWhereUniqueWithoutClassificationInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionUpdateWithoutClassificationInput)
  update!: PositionUpdateWithoutClassificationInput;

  @Field(() => PositionCreateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionCreateWithoutClassificationInput)
  create!: PositionCreateWithoutClassificationInput;
}
