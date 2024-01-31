import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateInput } from './position-request-create.input';
import { PositionRequestUpdateInput } from './position-request-update.input';

@ArgsType()
export class UpsertOnePositionRequestArgs {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>;

  @Field(() => PositionRequestCreateInput, { nullable: false })
  @Type(() => PositionRequestCreateInput)
  create!: PositionRequestCreateInput;

  @Field(() => PositionRequestUpdateInput, { nullable: false })
  @Type(() => PositionRequestUpdateInput)
  update!: PositionRequestUpdateInput;
}
