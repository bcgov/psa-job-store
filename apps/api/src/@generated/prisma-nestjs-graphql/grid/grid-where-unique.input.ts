import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GridWhereInput } from './grid-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntListFilter } from '../prisma/int-list-filter.input';
import { ClassificationListRelationFilter } from '../classification/classification-list-relation-filter.input';

@InputType()
export class GridWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [GridWhereInput], { nullable: true })
  AND?: Array<GridWhereInput>;

  @Field(() => [GridWhereInput], { nullable: true })
  OR?: Array<GridWhereInput>;

  @Field(() => [GridWhereInput], { nullable: true })
  NOT?: Array<GridWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => IntListFilter, { nullable: true })
  steps?: IntListFilter;

  @Field(() => ClassificationListRelationFilter, { nullable: true })
  classifications?: ClassificationListRelationFilter;
}
