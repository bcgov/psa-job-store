import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from './job-profile-state.enum';
import { IntFilter } from './int-filter.input';
import { EnumJobProfileStateFilter } from './enum-job-profile-state-filter.input';

@InputType()
export class EnumJobProfileStateWithAggregatesFilter {
  @Field(() => JobProfileState, { nullable: true })
  equals?: keyof typeof JobProfileState;

  @Field(() => [JobProfileState], { nullable: true })
  in?: Array<keyof typeof JobProfileState>;

  @Field(() => [JobProfileState], { nullable: true })
  notIn?: Array<keyof typeof JobProfileState>;

  @Field(() => EnumJobProfileStateWithAggregatesFilter, { nullable: true })
  not?: EnumJobProfileStateWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  _min?: EnumJobProfileStateFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  _max?: EnumJobProfileStateFilter;
}
