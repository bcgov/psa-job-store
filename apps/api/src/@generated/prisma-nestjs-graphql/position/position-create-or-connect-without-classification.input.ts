import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionCreateWithoutClassificationInput } from './position-create-without-classification.input';

@InputType()
export class PositionCreateOrConnectWithoutClassificationInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionCreateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionCreateWithoutClassificationInput)
  create!: PositionCreateWithoutClassificationInput;
}
