import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutClassificationInput } from './position-update-without-classification.input';

@InputType()
export class PositionUpdateWithWhereUniqueWithoutClassificationInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionUpdateWithoutClassificationInput)
  data!: PositionUpdateWithoutClassificationInput;
}
