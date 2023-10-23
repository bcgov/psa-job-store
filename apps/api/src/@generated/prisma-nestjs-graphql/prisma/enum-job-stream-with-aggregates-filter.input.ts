import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from './job-stream.enum';
import { IntFilter } from './int-filter.input';
import { EnumJobStreamFilter } from './enum-job-stream-filter.input';

@InputType()
export class EnumJobStreamWithAggregatesFilter {
  @Field(() => JobStream, { nullable: true })
  equals?: keyof typeof JobStream;

  @Field(() => [JobStream], { nullable: true })
  in?: Array<keyof typeof JobStream>;

  @Field(() => [JobStream], { nullable: true })
  notIn?: Array<keyof typeof JobStream>;

  @Field(() => EnumJobStreamWithAggregatesFilter, { nullable: true })
  not?: EnumJobStreamWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumJobStreamFilter, { nullable: true })
  _min?: EnumJobStreamFilter;

  @Field(() => EnumJobStreamFilter, { nullable: true })
  _max?: EnumJobStreamFilter;
}
