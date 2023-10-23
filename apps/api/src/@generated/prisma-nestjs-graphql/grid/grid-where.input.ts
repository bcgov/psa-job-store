import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ClassificationListRelationFilter } from '../classification/classification-list-relation-filter.input';

@InputType()
export class GridWhereInput {
  @Field(() => [GridWhereInput], { nullable: true })
  AND?: Array<GridWhereInput>;

  @Field(() => [GridWhereInput], { nullable: true })
  OR?: Array<GridWhereInput>;

  @Field(() => [GridWhereInput], { nullable: true })
  NOT?: Array<GridWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => ClassificationListRelationFilter, { nullable: true })
  classifications?: ClassificationListRelationFilter;
}
