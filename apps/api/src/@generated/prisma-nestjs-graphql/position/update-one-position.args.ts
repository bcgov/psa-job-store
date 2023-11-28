import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionUpdateInput } from './position-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';

@ArgsType()
export class UpdateOnePositionArgs {
  @Field(() => PositionUpdateInput, { nullable: false })
  @Type(() => PositionUpdateInput)
  data!: PositionUpdateInput;

  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;
}
