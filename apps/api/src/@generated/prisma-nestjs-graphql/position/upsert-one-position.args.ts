import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionCreateInput } from './position-create.input';
import { PositionUpdateInput } from './position-update.input';

@ArgsType()
export class UpsertOnePositionArgs {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionCreateInput, { nullable: false })
  @Type(() => PositionCreateInput)
  create!: PositionCreateInput;

  @Field(() => PositionUpdateInput, { nullable: false })
  @Type(() => PositionUpdateInput)
  update!: PositionUpdateInput;
}
