import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';
import { Type } from 'class-transformer';
import { GridCreateInput } from './grid-create.input';
import { GridUpdateInput } from './grid-update.input';

@ArgsType()
export class UpsertOneGridArgs {
  @Field(() => GridWhereUniqueInput, { nullable: false })
  @Type(() => GridWhereUniqueInput)
  where!: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;

  @Field(() => GridCreateInput, { nullable: false })
  @Type(() => GridCreateInput)
  create!: GridCreateInput;

  @Field(() => GridUpdateInput, { nullable: false })
  @Type(() => GridUpdateInput)
  update!: GridUpdateInput;
}
