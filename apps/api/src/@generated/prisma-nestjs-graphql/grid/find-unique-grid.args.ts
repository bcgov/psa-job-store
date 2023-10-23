import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueGridArgs {
  @Field(() => GridWhereUniqueInput, { nullable: false })
  @Type(() => GridWhereUniqueInput)
  where!: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;
}
