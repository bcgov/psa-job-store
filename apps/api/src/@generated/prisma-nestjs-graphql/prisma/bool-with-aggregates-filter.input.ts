import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from './int-filter.input';
import { BoolFilter } from './bool-filter.input';

@InputType()
export class BoolWithAggregatesFilter {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean;

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  not?: BoolWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => BoolFilter, { nullable: true })
  _min?: BoolFilter;

  @Field(() => BoolFilter, { nullable: true })
  _max?: BoolFilter;
}
