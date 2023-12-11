import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutClassificationInput } from './position-request-create-without-classification.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutClassificationInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>;

  @Field(() => PositionRequestCreateWithoutClassificationInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutClassificationInput)
  create!: PositionRequestCreateWithoutClassificationInput;
}
