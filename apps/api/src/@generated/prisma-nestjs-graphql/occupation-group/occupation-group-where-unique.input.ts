import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OccupationGroupWhereInput } from './occupation-group-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ClassificationListRelationFilter } from '../classification/classification-list-relation-filter.input';

@InputType()
export class OccupationGroupWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [OccupationGroupWhereInput], { nullable: true })
  AND?: Array<OccupationGroupWhereInput>;

  @Field(() => [OccupationGroupWhereInput], { nullable: true })
  OR?: Array<OccupationGroupWhereInput>;

  @Field(() => [OccupationGroupWhereInput], { nullable: true })
  NOT?: Array<OccupationGroupWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => ClassificationListRelationFilter, { nullable: true })
  classifications?: ClassificationListRelationFilter;
}
