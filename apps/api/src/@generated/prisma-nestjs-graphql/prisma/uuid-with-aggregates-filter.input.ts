import { Field, InputType } from '@nestjs/graphql';
import { IntFilter } from './int-filter.input';
import { QueryMode } from './query-mode.enum';
import { StringFilter } from './string-filter.input';

@InputType()
export class UuidWithAggregatesFilter {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: Array<string>;

  @Field(() => [String], { nullable: true })
  notIn?: Array<string>;

  @Field(() => String, { nullable: true })
  lt?: string;

  @Field(() => String, { nullable: true })
  lte?: string;

  @Field(() => String, { nullable: true })
  gt?: string;

  @Field(() => String, { nullable: true })
  gte?: string;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => QueryMode, { nullable: true })
  mode?: keyof typeof QueryMode;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  not?: UuidWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  _min?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  _max?: StringFilter;
}
