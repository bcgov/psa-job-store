import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridUpdateInput } from './grid-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';

@ArgsType()
export class UpdateOneGridArgs {
  @Field(() => GridUpdateInput, { nullable: false })
  @Type(() => GridUpdateInput)
  data!: GridUpdateInput;

  @Field(() => GridWhereUniqueInput, { nullable: false })
  @Type(() => GridWhereUniqueInput)
  where!: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;
}
