import { Field, InputType } from '@nestjs/graphql';
import { EnumJobProfileTypeFilter } from './enum-job-profile-type-filter.input';
import { IntFilter } from './int-filter.input';
import { JobProfileType } from './job-profile-type.enum';

@InputType()
export class EnumJobProfileTypeWithAggregatesFilter {
  @Field(() => JobProfileType, { nullable: true })
  equals?: keyof typeof JobProfileType;

  @Field(() => [JobProfileType], { nullable: true })
  in?: Array<keyof typeof JobProfileType>;

  @Field(() => [JobProfileType], { nullable: true })
  notIn?: Array<keyof typeof JobProfileType>;

  @Field(() => EnumJobProfileTypeWithAggregatesFilter, { nullable: true })
  not?: EnumJobProfileTypeWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumJobProfileTypeFilter, { nullable: true })
  _min?: EnumJobProfileTypeFilter;

  @Field(() => EnumJobProfileTypeFilter, { nullable: true })
  _max?: EnumJobProfileTypeFilter;
}
