import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ClassificationListRelationFilter } from '../classification/classification-list-relation-filter.input';

@InputType()
export class OccupationGroupWhereInput {
  @Field(() => [OccupationGroupWhereInput], { nullable: true })
  AND?: Array<OccupationGroupWhereInput>;

  @Field(() => [OccupationGroupWhereInput], { nullable: true })
  OR?: Array<OccupationGroupWhereInput>;

  @Field(() => [OccupationGroupWhereInput], { nullable: true })
  NOT?: Array<OccupationGroupWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => ClassificationListRelationFilter, { nullable: true })
  classifications?: ClassificationListRelationFilter;
}
